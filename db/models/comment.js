const db = require('../connection');
const Sequelize = require('sequelize');
const User = require('./user');
const Like = require('./like');

const CommentModel = db.define('comments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  parentType: {
    type: Sequelize.STRING(32),
    notEmpty: true,
    allowNull: false
  },
  parentId: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  },
  text: {
    type: Sequelize.STRING(512),
    notEmpty: true,
    allowNull: false
  },
  likeCount: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  }
});

let Comment = {model: CommentModel};

Comment.create = ({userId, parentClass, parentId, text}) => {
  if (!text) {
    return Promise.reject('Comment text cannot be empty');
  }
  if (!parentClass.getById) {
    return Promise.reject('Comment parent model not defined');
  }
  return User.getById(userId)
    .then(() => {
      return parentClass.getById(parentId);
    })
    .then(() => {
      return Comment.model.create({userId, parentType: parentClass.name, parentId, text, likeCount: 0});
    });
};

Comment.edit = ({userId, commentId, text}) => {
  if (!text) {
    return Promise.reject('Comment text cannot be empty');
  }
  return User.getById(userId)
    .then((user) => {
      return Comment.getById(commentId)
        .then((comment) => {
          if (user.id !== comment.userId) {
            return Promise.reject('Cannot edit a comment you do not own');
          }
          return comment.update({text: text});
        });
    });
};

Comment.delete = ({userId, commentId}) => {
  return User.getById(userId)
    .then(() => {
      return Comment.getById(commentId)
        .then((comment) => {
          if (userId !== comment.userId) {
            return Promise.reject('Cannot delete another user\'s comment');
          }
          return comment.destroy()
            .then(() => {
              return true;
            });
        });
    });
};

Comment.getByUser = (userId) => {
  return User.getById(userId)
    .then(() => {
      return Comment.model.findAll({
        where: userId
      });
    });
};

Comment.getByParent = ({parentClass, parentId}) => {
  if (!parentClass.getById) {
    return Promise.reject('Comment parent model not defined');
  }
  return parentClass.getById(parentId)
    .then((parent) => {
      return Comment.model.findAll({
        where: {parentType: parentClass.name, parentId: parent.id}
      });
    });
};

Comment.getById = (userId) => {
  return Comment.model.findById(userId)
    .then((comment) => {
      return comment ? comment : Promise.reject('Comment does not exist');
    });
};


// TODO - Test this somehow
Comment.addToClass = (parentClass) => {
  parentClass.Comment = {};
  
  parentClass.Comment.create = (input) => {
    return Comment.create({userId: input.userId, parentClass, parentId: input[parentClass.name + 'Id'], text: input.text});
  };
  
  parentClass.Comment.edit = Comment.edit;
  
  parentClass.Comment.delete = Comment.delete;
  
  parentClass.Comment.get = (parentId) => {
    return Comment.getByParent({parentClass, parentId});
  };
};

Comment.name = 'comment';
Like.addToClass(Comment);

module.exports = Comment;
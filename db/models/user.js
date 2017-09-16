const db = require('../connection');
const Sequelize = require('sequelize');
const bCrypt = require('bcryptjs');
const defaultTheme = 1;

const generateHash = (password) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};
const generateUsername = (username) => {
  return ((username ? username.split('@')[0] + '_' : '') + Math.floor(Math.random() * 100000000)).toString();
};

const UserModel = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  oAuthUserId: {
    type: Sequelize.STRING(128)
  },
  oAuthProvider: {
    type: Sequelize.STRING(32)
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  username: {
    type: Sequelize.STRING(64),
    unique: true,
    notEmpty: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(64)
  },
  theme: {
    type: Sequelize.INTEGER(4)
  },
  name: {
    type: Sequelize.STRING(64),
    notEmpty: true,
    allowNull: false
  },
  profession: {
    type: Sequelize.STRING(64)
  },
  avatarUrl: {
    type: Sequelize.STRING(512)
  },
  description: {
    type: Sequelize.STRING(512)
  }
});

let User = {model: UserModel};

User.create = ({oAuthUserId, oAuthProvider, email, username, password, name, profession, avatarUrl, description}) => {
  if (oAuthUserId && oAuthProvider) {
    if (password) {
      return new Promise((resolve, reject) => {
        reject('Cannot create oAuth account with local password');
      });
    }
  } else if (username && password) {
    if (oAuthUserId) {
      return new Promise((resolve, reject) => {
        reject('Cannot create local auth account with oAuth ID');
      });
    }
    if (oAuthProvider) {
      return new Promise((resolve, reject) => {
        reject('Cannot create local auth account with oAuth provider');
      });
    }
  } else {
    return new Promise((resolve, reject) => {
      reject('Cannot create account without neither oAuth nor local auth credentials');
    });
  }
  return User.model.create({
    oAuthUserId,
    oAuthProvider,
    email,
    username: username || generateUsername((email || oAuthUserId.toString())),
    password: password ? generateHash(password): undefined,
    theme: defaultTheme,
    name,
    profession,
    avatarUrl,
    description
  });
};

User.update = (userId, query) => {
  if (!query) {
    return Promise.reject('No update query was specified');
  }
  if (query.oAuthUserId || query.oAuthProvider) {
    return Promise.reject('Cannot modify oAuth data');
  }
  return User.getById(userId)
    .then((user) => {
      if (query.password) {
        return Promise.reject('Cannot update password field in update method - try the updatePassword method instead');
      }
      return user.update(query);
    });
};

User.updatePassword = ({userId, currentPassword, newPassword}) => {
  if (!(currentPassword && newPassword)) {
    return Promise.reject('Must provide both current password and new password when changing password');
  }
  return User.getById(userId)
    .then((user) => {
      if (user.oAuthUserId) {
        return Promise.reject('Cannot update password for oAuth user');
      }
      if (!bCrypt.compareSync(currentPassword, user.password)) {
        return Promise.reject('Current password is incorrect');
      }
      password = generateHash(newPassword);
      return user.update({password});
    });
};

User.follow = (followerId, followeeId) => {
  if (followerId === followeeId) {
    return Promise.reject('Cannot follow yourself');
  }
  return User.getById(followerId)
    .then((follower) => {
      return User.getById(followeeId)
        .then((followee) => {
          return followee.addFollower(follower);
        });
    })
    .then((response) => {
      return true;
    });
};

User.unfollow = (followerId, followeeId) => {
  return User.getById(followerId)
    .then((follower) => {
      return User.getById(followeeId)
        .then((followee) => {
          followee.removeFollower(follower);
        });
    })
    .then((response) => {
      return true;
    });
};

User.getFollowers = (userId) => {
  return User.model.findOne({
    where: {
      id: userId
    },
    include: [
      {
        model: User.model,
        as: 'follower',
        attributes: {
          exclude: ['password']
        }
      }
    ]
  })
    .then((user) => {
      return user ? user.follower : Promise.reject('User does not exist');
    });
};

User.getFollows = (userId) => {
  return User.model.findOne({
    where: {
      id: userId
    },
    include: [
      {
        model: User.model,
        as: 'followee',
        attributes: {
          exclude: ['password']
        }
      }
    ]
  })
    .then((user) => {
      return user ? user.followee : Promise.reject('User does not exist');
    });
};

User.getByEmail = (email) => {
  return User.model.findOne({
    where: {email}
  })
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

User.getByUsername = (username) => {
  return User.model.findOne({
    where: {username}
  })
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

User.getById = (userId) => {
  return User.model.findById(userId)
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

// TODO - Write tests for this function
User.getByOAuthId = (oAuthUserId, oAuthProvider) => {
  return User.model.findOne({
    where: {oAuthUserId, oAuthProvider}
  })
    .then((user) => {
      return user ? user : Promise.reject('User does not exist');
    });
};

module.exports = User;
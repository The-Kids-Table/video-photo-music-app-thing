const db = require('../connection');
const Sequelize = require('sequelize');
const User = require('./user');
const Project = require('./project');
const Comment = require('./comment');
const Like = require('./like');
const componentTypes = {
  audio: true,
  video: true,
  image: true,
  text: true,
  file: true
};

const ProjectComponentModel = db.define('components', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(64),
    notEmpty: true,
    allowNull: false
  },
  resourceUrl: {
    type: Sequelize.STRING(512),
    notEmpty: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(512)
  },
  type: {
    type: Sequelize.STRING(32),
    notEmpty: true,
    allowNull: false
  },
  isDownloadable: {
    type: Sequelize.BOOLEAN,
    notEmpty: true,
    allowNull: false
  },
  isFeatured: {
    type: Sequelize.BOOLEAN,
    notEmpty: true,
    allowNull: false
  },
  thumbnailUrl: {
    type: Sequelize.STRING(512)
  },
  likeCount: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  }
});

let ProjectComponent = {model: ProjectComponentModel};

ProjectComponent.create = ({userId, projectId, type, name, resourceUrl, description, isDownloadable = false, isFeatured = false, thumbnailUrl}) => {
  if (!componentTypes[type]) {
    return Promise.reject('Component type is invalid');
  }
  return User.getById(userId)
    .then(() => {
      return Project.getById(projectId);
    })
    .then((project) => {
      return Project.getContributors(projectId)
        .then((contributors) => {
          let isContributor = !!contributors.filter((user) => {
            return user.id === userId;
          })[0];
          if (!isContributor && project.ownerId !== userId) {
            return Promise.reject('Cannot create a component in a project you are not a part of');
          }
        });
    })
    .then(() => {
      return ProjectComponent.model.create({
        authorId: userId,
        projectId,
        name,
        resourceUrl,
        description,
        type,
        isDownloadable: isDownloadable === true ? true : false,
        isFeatured: false,
        thumbnailUrl,
        likeCount: 0
      });
    })
    .then((newComponent) => {
      if (isFeatured) {
        return ProjectComponent.setAsFeatured({userId, componentId: newComponent.id})
          .then(() => {
            return ProjectComponent.getById(newComponent.id);
          });
      } else {
        return newComponent;
      }
    });
};

ProjectComponent.update = (userId, componentId, {name, resourceUrl, type, description, isDownloadable, thumbnailUrl}) => {
  let options = {name, resourceUrl, type, description, isDownloadable, thumbnailUrl};
  Object.keys(options).forEach(key => options[key] === undefined ? delete options[key] : null);
  return User.getById(userId)
    .then(() => {
      return ProjectComponent.getById(componentId);
    })
    .then((component) => {
      return Project.getById(component.projectId)
        .then((project) => {
          return Project.getContributors(project.id)
            .then((contributors) => {
              let isContributor = !!contributors.filter((user) => {
                return user.id === userId;
              })[0];
              if (!isContributor && project.ownerId !== userId) {
                return Promise.reject('Cannot edit a component in a project you are not a part of');
              }
              return component.update(options);
            });
        });
    });
};

ProjectComponent.delete = (userId, componentId) => {
  return User.getById(userId)
    .then(() => {
      return ProjectComponent.getById(componentId);
    })
    .then((component) => {
      return Project.getById(component.projectId)
        .then((project) => {
          return Project.getContributors(project.id)
            .then((contributors) => {
              let isContributor = !!contributors.filter((user) => {
                return user.id === userId;
              })[0];
              if (!isContributor && project.ownerId !== userId) {
                return Promise.reject('Cannot delete a component in a project you are not a part of');
              }
              return component.destroy();
            });
        });
    })
    .then(() => {
      return true;
    });
};

ProjectComponent.setAsFeatured = ({userId, componentId}) => {
  return User.getById(userId)
    .then(() => {
      return ProjectComponent.getById(componentId);
    })
    .then((component) => {
      return Project.getById(component.projectId)
        .then((project) => {
          if (project.ownerId !== userId) {
            return Promise.reject('Cannot set featured component in a project you do not own');
          }
          return ProjectComponent.getByProject(component.projectId)
            .then((componentList) => {
              for (let i = 0; i < componentList.length; i++) {
                if (componentList[i].isFeatured) {
                  if (componentList[i].id === component.id) {
                    return Promise.reject('Component is already featured');
                  }
                  return componentList[i].update({isFeatured: false});
                }
              }
            });
        })
        .then(() => {
          return component.update({isFeatured: true});
        });
    })
    .then(() => {
      return true;
    });
};

// TODO - Somehow move this function into the project model
ProjectComponent.getFeatured = (projectId) => {
  return Project.getById(projectId)
    .then(() => {
      return ProjectComponent.model.findOne({
        where: {projectId, isFeatured: true}
      });
    })
    .then((featuredComponent) => {
      return featuredComponent || null;
    });
};

ProjectComponent.getByProject = (projectId, includeFeatured = true) => {
  return Project.getById(projectId)
    .then(() => {
      let query = {projectId};
      if (!includeFeatured) {
        query.isFeatured = false;
      }
      return ProjectComponent.model.findAll({
        where: query
      });
    });
};

ProjectComponent.getByUser = (userId) => {
  return User.getById(userId)
    .then(() => {
      return ProjectComponent.model.findAll({
        where: {authorId: userId}
      });
    });
};

ProjectComponent.getByName = (componentName) => {
  return ProjectComponent.model.findAll({
    where: {name: componentName}
  });
};

ProjectComponent.getById = (componentId) => {
  return ProjectComponent.model.findById(componentId)
    .then((component) => {
      return component ? component : Promise.reject('Component does not exist');
    });
};

ProjectComponent.name = 'projectComponent';
Comment.addToClass(ProjectComponent);
Like.addToClass(ProjectComponent);

module.exports = ProjectComponent;
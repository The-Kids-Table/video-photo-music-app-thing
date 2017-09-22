const db = require('../connection');
const User = require('./user');
const Contributor = require('./contributor');
const Sequelize = require('sequelize');
const Comment = require('./comment');
const Like = require('./like');
const Tag = require('./tag');

const ProjectModel = db.define('projects', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(128),
    notEmpty: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING(512)
  },
  tagline: {
    type: Sequelize.STRING(256)
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

let Project = {model: ProjectModel};

Project.create = ({ownerId, name, description, tagline, thumbnailUrl}) => {
  return User.getById(ownerId)
    .then(() => {
      return Project.getByUserAndName(ownerId, name)
        .then(() => {
          // If it reached this 'then' block, then a project by this user and with this name already exists
          return Promise.reject('Cannot create two projects with the same name');
        });
    })
    .catch((e) => {
      if (e === 'Project does not exist') {
        return Project.model.create({ownerId, name, description, tagline, thumbnailUrl, likeCount: 0});
      } else {
        return Promise.reject(e);
      }
    });
};
Project.update = ({userId, projectId, options: {name, description, tagline, thumbnailUrl, ownerId}}) => {
  let options = {name, description, tagline, thumbnailUrl, ownerId};
  Object.keys(options).forEach(key => options[key] === undefined ? delete options[key] : null);
  return Project.getById(projectId)
    .then((project) => {
      return userId === project.ownerId ? project.update(options) : Promise.reject('Must be owner to edit project');
    });
};

Project.delete = (userId, projectId) => {
  return User.getById(userId)
    .then((user) => {
      return Project.getById(projectId)
        .then((project) => {
          if (project.ownerId !== user.id) {
            return Promise.reject('Cannot delete a project that you do not own');
          }
          return project.destroy();
        })
        .then((res) => {
          return true;
        });
    });
};

Project.getById = (projectId) => {
  return Project.model.findById(projectId)
    .then((project) => {
      return project ? project : Promise.reject('Project does not exist');
    });
};

Project.getByName = (name) => {
  return Project.model.findAll({
    where: {name}
  });
};

// Gets all projects owned by a particular user
Project.getByUser = (userId) => {
  return User.getById(userId)
    .then(() => {
      return Project.model.findAll({
        where: {ownerId: userId}
      });
    });
};

// Gets a particular project by a user given the userID and the project name
Project.getByUserAndName = (userId, projectName) => {
  return User.getById(userId)
    .then(() => {
      return Project.model.findOne({
        where: {
          ownerId: userId,
          name: projectName
        }
      });
    })
    .then((project) => {
      return project ? project : Promise.reject('Project does not exist');
    });
};

Project.addContributor = ({ownerId, contributorId, projectId, role}) => {
  if (!role || role.constructor !== String || role === '') {
    return Promise.reject('Role must be a non-empty string');
  }
  return Project.getById(projectId)
    .then((project) => {
      if (project.ownerId !== ownerId) {
        return Promise.reject('Cannot add contributors to a project you do not own');
      }
      return User.getById(contributorId)
        .then((user) => {
          if (user.id === ownerId) {
            return Promise.reject('Owner cannot be added as a contributor');
          }
          return Contributor.model.findOrCreate({
            where: {
              contributorId: user.id,
              projectId: project.id
            },
            defaults: {role}
          })
            .spread((contributor, created) => {
              return created ? true : Promise.reject('User is already a contributor to this project');
            });
        });
    });
};

Project.removeContributor = ({ownerId, contributorId, projectId}) => {
  return Project.getById(projectId)
    .then((project) => {
      if (project.ownerId !== ownerId) {
        return Promise.reject('Cannot remove contributors from a project you do not own');
      }
      return User.getById(contributorId)
        .then((user) => {
          return project.removeContributor(user)
            .then((response) => {
              return response ? true : Promise.reject('User is not a contributor to this project');
            });
        });
    });
};

Project.getContributors = (projectId) => {
  return Project.model.findOne({
    where: {
      id: projectId,
    },
    include: [
      {
        model: User.model,
        as: 'contributor',
        through: {
          attributes: ['role']
        }
      }
    ]
  })
    .then((project) => {
      if (!project) {
        return Promise.reject('Project does not exist');
      }
      project.contributor.forEach((contributorModel) => {
        contributorModel.role = contributorModel.contributors.role;
      });
      return project.contributor;
    });
};


Project.name = 'project';
Comment.addToClass(Project);
Like.addToClass(Project);


Project.addTag = ({userId, projectId, text}) => {
  if (!text || text.constructor !== String || text === '') {
    return Promise.reject('Tag text cannot be blank');
  }
  return User.getById(userId)
    .then(() => {
      return Project.getById(projectId)
    })
    .then((project) => {
      return Project.getContributors(project.id)
      .then((contributors) => {
        let contributorIds = [];
        // TODO - Don't look for contributors if the owner is editing tags
        contributors.forEach((contributor) => { contributorIds.push(contributor.id); });
        return contributorIds.includes(userId) || userId === project.ownerId ? true : Promise.reject('Must be a contributor or owner to add tags to this project');
      })
      .then(() => {
        return Tag.model.findOne({
          where: {text}
        })
          .then((tag) => {
            return tag ? tag : Tag.model.create({text});
          })
          .then((tag) => {
            return project.addTag(tag);
          });
      });
    })
    .then(() => {
      return true;
    });
};

Project.removeTag = ({userId, projectId, text}) => {
  if (!text || text.constructor !== String || text === '') {
    return Promise.reject('Tag text cannot be blank');
  }
  return User.getById(userId)
    .then(() => {
      return Project.getById(projectId)
        .then((project) => {
          return Project.getContributors(project.id)
            .then((contributors) => {
              let contributorIds = [];
              contributors.forEach((contributor) => { contributorIds.push(contributor.id); });
              return contributorIds.includes(userId) || userId === project.ownerId ? true : Promise.reject('Must be a contributor or owner to remove tags from this project');
            })
            .then(() => {
              return Tag.model.findOne({
                where: {
                  text
                }
              });
            })
            .then((tag) => {
              if (tag) {
                return project.removeTag(tag);
              } else {
                return true;
              }
            });
        })
        .then(() => {
          return true;
        });
    });
};

Project.getTags = (projectId) => {
  return Project.model.findOne({
    where: {
      id: projectId,
    },
    include: [
      {
        model: Tag.model,
        as: 'tag'
      }
    ]
  })
    .then((project) => {
      return project ? project.tag : Promise.reject('Project does not exist');
    })
    .then((tagModels) => {
      let tags = [];
      tagModels.forEach((model) => {
        tags.push(model.text);
      });
      return tags;
    });
};

Project.getByTag = (text) => {
  if (!text || text.constructor !== String || text === '') {
    return Promise.reject('Tag text cannot be blank');
  }
  return Tag.model.findOne({
    where: {text},
    include: [
      {
        model: Project.model, 
        as: 'project'
      }
    ]
  })
    .then((tag) => {
      return tag ? tag.project : [];
    });
};

module.exports = Project;
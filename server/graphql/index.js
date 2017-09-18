const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');
const db = require('../../db');
const { UserType, ProjectType, ProjectComponentType, CommentType } = require('./types');

clearUndefinedVals = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
};

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLInt},
        email: {type: GraphQLString},
        username: {type: GraphQLString}
      },
      resolve(parentValue, args, request) {
        if (Object.keys(args).length > 1) {
          return Promise.reject('Needs zero or one arguments but got ' + Object.keys(args).length);
        }
        if (Object.keys(args).length === 0) {
          if (!request.user) {
            return Promise.reject('You are not logged in');
          }
          return db.User.getById(request.user.id);
        }
        if (args.id) {
          return db.User.getById(args.id);
        }
        if (args.email) {
          return db.User.getByEmail(args.email);
        }
        if (args.username) {
          return db.User.getByUsername(args.username);
        }
      }
    },
    project: {
      type: ProjectType,
      args: {id: {type: new GraphQLNonNull(GraphQLInt)}},
      resolve(parentValue, args) {
        return db.Project.getById(args.id);
      }
    },
    projectComponent: {
      type: ProjectComponentType,
      args: {id: {type: GraphQLInt}},
      resolve(parentValue, args) {
        return db.ProjectComponent.getById(args.id);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    editUser: {
      type: UserType,
      args: {
        email: {type: GraphQLString},
        username: {type: GraphQLString},
        theme: {type: GraphQLInt},
        name: {type: GraphQLString},
        profession: {type: GraphQLString},
        avatarUrl: {type: GraphQLString},
        description: {type: GraphQLString}
      },
      resolve(parentValue, args, request) {
        if (!request.user) {
          return Promise.reject('You are not logged in');
        }
        clearUndefinedVals(args);
        return db.User.update(request.user.id, args);
      }
    },
    editUserPassword: {
      type: GraphQLBoolean,
      args: {
        currentPassword: {type: new GraphQLNonNull(GraphQLString)},
        newPassword: {type: new GraphQLNonNull(GraphQLString)},
      },
      resolve(parentValue, {currentPassword, newPassword}, request) {
        if (!request.user) {
          return Promise.reject('You are not logged in');
        }
        return db.User.updatePassword({userId: request.user.id, currentPassword, newPassword});
      }
    },
    followUser: {
      type: UserType,
      args: {
        userId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {userId}, request) {
        if (!request.user) {
          return Promise.reject('Cannot follow a user when you are not logged in');
        }
        return db.User.follow(request.user.id, userId);
      }
    },
    unfollowUser: {
      type: UserType,
      args: {
        userId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {userId}, request) {
        if (!request.user) {
          return Promise.reject('Cannot unfollow a user when you are not logged in');
        }
        return db.User.unfollow(request.user.id, userId);
      }
    },
    createProject: {
      type: ProjectType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        tagline: {type: GraphQLString},
        thumbnailUrl: {type: GraphQLString},
      },
      resolve(parentValue, {name, description, tagline, thumbnailUrl}, request) {
        if (!request.user) {
          return Promise.reject('Cannot create a project when you are not logged in');
        }
        return db.Project.create({ownerId: request.user.id, name, description, tagline, thumbnailUrl});
      }
    },
    editProject: {
      type: ProjectType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        tagline: {type: GraphQLString}
      },
      resolve(parentValue, {id, name, description, tagline}, request) {
        if (!request.user) {
          return Promise.reject('Cannot edit a project when you are not logged in');
        }
        let args = {name, description, tagline}
        clearUndefinedVals(args);
        return db.Project.update({userId: request.user.id, projectId: id, options: args});
      }
    },
    addProjectTag: {
      type: GraphQLBoolean,
      args: {
        projectId: {type: new GraphQLNonNull(GraphQLInt)},
        text: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {projectId, text}, request) {
        if (!request.user) {
          return Promise.reject('Cannot add tag to project when you are not logged in');
        }
        return db.Project.addTag({
          userId: request.user.id,
          projectId,
          text
        });
      }
    },
    removeProjectTag: {
      type: GraphQLBoolean,
      args: {
        projectId: {type: new GraphQLNonNull(GraphQLInt)},
        text: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {projectId, text}, request) {
        if (!request.user) {
          return Promise.reject('Cannot remove tag to project when you are not logged in');
        }
        return db.Project.removeTag({
          userId: request.user.id,
          projectId,
          text
        });
      }
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {id}, request) {
        if (!request.user) {
          return Promise.reject('Cannot delete a project when you are not logged in');
        }
        return db.Project.delete(request.user.id, id);
      }
    },
    createProjectComponent: {
      type: ProjectComponentType,
      args: {
        projectId: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        type: {type: new GraphQLNonNull(GraphQLString)},
        resourceUrl: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        isDownloadable: {type: new GraphQLNonNull(GraphQLBoolean)},
        thumbnailUrl: {type: GraphQLString},
      },
      resolve(parentValue, {projectId, name, type, resourceUrl, description, isDownloadable, thumbnailUrl}, request) {
        if (!request.user) {
          return Promise.reject('Cannot create a project component when you are not logged in');
        }
        return db.ProjectComponent.create({userId: request.user.id, projectId, name, type, resourceUrl, description, isDownloadable, thumbnailUrl});
      }
    },
    editProjectComponent: {
      type: ProjectComponentType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLString},
        type: {type: GraphQLString},
        resourceUrl: {type: GraphQLString},
        description: {type: GraphQLString},
        isDownloadable: {type: GraphQLBoolean}
      },
      resolve(parentValue, {id, name, type, resourceUrl, description, isDownloadable}, request) {
        if (!request.user) {
          return Promise.reject('Cannot edit a project component when you are not logged in');
        }
        let args = {name, type, resourceUrl, description, isDownloadable};
        clearUndefinedVals(args);
        return db.ProjectComponent.update(request.user.id, id, args);
      }
    },
    deleteProjectComponent: {
      type: ProjectComponentType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {id}, request) {
        if (!request.user) {
          return Promise.reject('Cannot delete a project component when you are not logged in');
        }
        return db.ProjectComponent.delete(request.user.id, id);
      }
    },
    setFeaturedProjectComponent: {
      type: GraphQLBoolean,
      args: {
        projectComponentId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {projectComponentId}, request) {
        if (!request.user) {
          return Promise.reject('Cannot set featured component when you are not logged in');
        }
        return db.ProjectComponent.setAsFeatured({userId: request.user.id, componentId: projectComponentId});
      }
    },
    addProjectContributor: {
      type: UserType,
      args: {
        userId: {type: new GraphQLNonNull(GraphQLInt)},
        projectId: {type: new GraphQLNonNull(GraphQLInt)},
        role: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {userId, projectId, role}, request) {
        if (!request.user) {
          return Promise.reject('Cannot add contributor when you are not logged in');
        }
        return db.Project.addContributor({ownerId: request.user.id, contributorId: userId, projectId, role});
      }
    },
    removeProjectContributor: {
      type: UserType,
      args: {
        userId: {type: new GraphQLNonNull(GraphQLInt)},
        projectId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {userId, projectId}, request) {
        if (!request.user) {
          return Promise.reject('Cannot remove contributor when you are not logged in');
        }
        return db.Project.removeContributor({ownerId: request.user.id, contributorId: userId, projectId});
      }
    },
    createProjectComment: {
      type: CommentType,
      args: {
        projectId: {type: new GraphQLNonNull(GraphQLInt)},
        text: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {projectId, text}, request) {
        return db.Project.Comment.create({userId: request.user.id, projectId, text});
      }
    },
    createProjectComponentComment: {
      type: CommentType,
      args: {
        projectComponentId: {type: new GraphQLNonNull(GraphQLInt)},
        text: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {projectComponentId, text}, request) {
        return db.ProjectComponent.Comment.create({userId: request.user.id, projectComponentId, text});
      }
    },
    editComment: {
      type: CommentType,
      args: {
        commentId: {type: new GraphQLNonNull(GraphQLInt)},
        text: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parentValue, {commentId, text}, request) {
        return db.Comment.edit({userId: request.user.id, commentId, text});
      }
    },
    deleteComment: {
      type: CommentType,
      args: {commentId: {type: new GraphQLNonNull(GraphQLInt)}},
      resolve(parentValue, {commentId}, request) {
        return db.Comment.delete({userId: request.user.id, commentId});
      }
    },
    likeProject: {
      type: GraphQLBoolean,
      args: {
        projectId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {projectId}, request) {
        return db.Project.Like.create({userId: request.user.id, projectId});
      }
    },
    unlikeProject: {
      type: GraphQLBoolean,
      args: {
        projectId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {projectId}, request) {
        return db.Project.Like.delete({userId: request.user.id, projectId});
      }
    },
    likeComponent: {
      type: GraphQLBoolean,
      args: {
        projectComponentId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {projectComponentId}, request) {
        return db.ProjectComponent.Like.create({userId: request.user.id, projectComponentId});
      }
    },
    unlikeComponent: {
      type: GraphQLBoolean,
      args: {
        projectComponentId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {projectComponentId}, request) {
        return db.ProjectComponent.Like.delete({userId: request.user.id, projectComponentId});
      }
    },
    likeComment: {
      type: GraphQLBoolean,
      args: {
        commentId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {commentId}, request) {
        return db.Comment.Like.create({userId: request.user.id, commentId});
      }
    },
    unlikeComment: {
      type: GraphQLBoolean,
      args: {
        commentId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {commentId}, request) {
        return db.Comment.Like.delete({userId: request.user.id, commentId});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull} = require('graphql');
const db = require('../../db');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLInt},
    oAuthUserId: {type: GraphQLString},
    oAuthProvider: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    username: {type: GraphQLString},
    theme: {type: GraphQLInt},
    name: {type: GraphQLString},
    handle: {type: GraphQLString},
    avatarUrl: {type: GraphQLString},
    description: {type: GraphQLString}
  }
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    tagline: {type: GraphQLString},
    owner: {
      type: UserType,
      resolve(parentValue, args) {
        return db.User.getById(parentValue.ownerId);
      }
    },
    contributors: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return db.Project.getContributors(parentValue.id)
      }
    },
    components: {
      type: new GraphQLList(ProjectComponentType),
      resolve(parentValue, args) {
        return db.ProjectComponent.getByProject(parentValue.id);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, args) {
        return db.Project.Comment.get(parentValue.id)
      }
    }
  })
});

const ProjectComponentType = new GraphQLObjectType({
  name: 'ProjectComponent',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    resourceUrl: {type: GraphQLString},
    description: {type: GraphQLString},
    type: {type: GraphQLString},
    isDownloadable: {type: GraphQLBoolean},
    author: {
      type: UserType,
      resolve(parentValue, args) {
        return db.User.getById(parentValue.authorId);
      }
    },
    project: {
      type: ProjectType,
      resolve(parentValue, args) {
        return db.Project.getById(parentValue.projectId);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, args) {
        return db.ProjectComponent.Comment.get(parentValue.id)
      }
    }
  })
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: {
    id: {type: GraphQLInt},
    text: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parentValue, args) {
        return db.User.getById(parentValue.userId);
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {type: GraphQLInt},
        handle: {type: GraphQLString},
        email: {type: GraphQLString},
        username: {type: GraphQLString}
      },
      resolve(parentValue, args) {
        if (Object.keys(args).length !== 1) {
          return Promise.reject('Needs one argument but got ' + Object.keys(args).length);
        }
        if (args.id) {
          return db.User.getById(args.id);
        }
        if (args.handle) {
          return db.User.getByHandle(args.handle);
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
      args: {id: {type: GraphQLInt}},
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
        password: {type: GraphQLString},
        theme: {type: GraphQLInt},
        name: {type: GraphQLString},
        handle: {type: GraphQLString},
        avatar: {type: GraphQLString},
        description: {type: GraphQLString}
      },
      resolve(parentValue, args, request) {
        if (!request.user) {
          return Promise.reject('You are not logged in');
        }
        return db.User.update(request.user.id, args);
      }
    },
    createProject: {
      type: ProjectType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        tagline: {type: GraphQLString}
      },
      resolve(parentValue, {name, description, tagline}, request) {
        if (!request.user) {
          return Promise.reject('Cannot create a project when you are not logged in');
        }
        return db.Project.create({ownerId: request.user.id, name, description, tagline});
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
        return db.Project.update({userId: request.user.id, projectId: id, options: {name, description, tagline}});
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
        isDownloadable: {type: new GraphQLNonNull(GraphQLBoolean)}
      },
      resolve(parentValue, {projectId, name, type, resourceUrl, description, isDownloadable}, request) {
        if (!request.user) {
          return Promise.reject('Cannot create a project component when you are not logged in');
        }
        return db.ProjectComponent.create({userId: request.user.id, projectId, name, type, resourceUrl, description, isDownloadable});
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
        return db.ProjectComponent.update(request.user.id, id, {name, type, resourceUrl, description, isDownloadable});
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
    addProjectContributor: {
      type: UserType,
      args: {
        userId: {type: new GraphQLNonNull(GraphQLInt)},
        projectId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parentValue, {userId, projectId}, request) {
        if (!request.user) {
          return Promise.reject('Cannot add contributor when you are not logged in');
        }
        return db.Project.addContributor({ownerId: request.user.id, contributorId: userId, projectId});
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
    // likeProject: {},
    // unlikeProject: {},
    // likeComponent: {},
    // unlikeComponent: {},
    // likeComment: {},
    // unlikeComment: {}
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
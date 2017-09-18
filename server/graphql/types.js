const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList, GraphQLNonNull } = require('graphql');
const db = require('../../db');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {type: GraphQLInt},
    oAuthUserId: {type: GraphQLString},
    oAuthProvider: {type: GraphQLString},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    username: {type: GraphQLString},
    theme: {type: GraphQLInt},
    name: {type: GraphQLString},
    profession: {type: GraphQLString},
    avatarUrl: {type: GraphQLString},
    description: {type: GraphQLString},
    role: {type: GraphQLString},
    followers: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return db.User.getFollowers(parentValue.id);
      }
    },
    follows: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return db.User.getFollows(parentValue.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue, args) {
        return db.Project.getByUser(parentValue.id);
      }
    },
    project: {
      type: ProjectType,
      args: {name: {type: new GraphQLNonNull(GraphQLString)}},
      resolve(parentValue, args) {
        return db.Project.getByUserAndName(parentValue.id, args.name);
      }
    },
    components: {
      type: new GraphQLList(ProjectComponentType),
      resolve(parentValue, args) {
        return db.ProjectComponent.getByUser(parentValue.id);
      }
    }
  })
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: {type: GraphQLInt},
    name: {type: GraphQLString},
    description: {type: GraphQLString},
    tagline: {type: GraphQLString},
    thumbnailUrl: {type: GraphQLString},
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
      args: {includeFeatured: {type: GraphQLBoolean}},
      resolve(parentValue, args) {
        return db.ProjectComponent.getByProject(parentValue.id, args.includeFeatured === undefined ? false : args.includeFeatured);
      }
    },
    featuredComponent: {
      type: ProjectComponentType,
      resolve(parentValue, args) {
        return db.ProjectComponent.getFeatured(parentValue.id);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, args) {
        return db.Project.Comment.get(parentValue.id)
      }
    },
    likes: {
      type: GraphQLInt,
      resolve(parentValue, args) {
        return db.Project.Like.getCount(parentValue.id);
      }
    },
    hasLiked: {
      type: GraphQLBoolean,
      resolve(parentValue, args, request) {
        if (!request.user) {
          return false;
        }
        return db.Project.Like.isLikedByUser(parentValue.id, request.user.id);
      }
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      resolve(parentValue, args) {
        return db.Project.getTags(parentValue.id);
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
    thumbnailUrl: {type: GraphQLString},
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
    },
    likes: {
      type: GraphQLInt,
      resolve(parentValue, args) {
        return db.ProjectComponent.Like.getCount(parentValue.id);
      }
    },
    hasLiked: {
      type: GraphQLBoolean,
      resolve(parentValue, args) {
        if (!request.user) {
          return false;
        }
        return db.ProjectComponent.Like.isLikedByUser(parentValue.id, request.user.id);
      }
    }
  })
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: {type: GraphQLInt},
    text: {type: GraphQLString},
    likes: {
      type: GraphQLInt,
      resolve(parentValue, args) {
        return db.Comment.Like.getCount(parentValue.id);
      }
    },
    hasLiked: {
      type: GraphQLBoolean,
      resolve(parentValue, args) {
        if (!request.user) {
          return false;
        }
        return db.Comment.Like.isLikedByUser(parentValue.id, request.user.id);
      }
    },
    user: {
      type: UserType,
      resolve(parentValue, args) {
        return db.User.getById(parentValue.userId);
      }
    }
  })
});

module.exports = { UserType, ProjectType, ProjectComponentType, CommentType };
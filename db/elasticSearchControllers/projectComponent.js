const elasticSearch = require('../../elasticSearch');
const dbProjectComponent = require('../models/projectComponent');
const dbUser = require('../models/user');

let ProjectComponent = {...dbProjectComponent};

ProjectComponent.create = (input) => {
  return dbProjectComponent.create(input)
    // TODO - Find a way to use 'tap' instead of 'then' here
    .then((projectComponent) => {
      dbUser.getById(projectComponent.authorId)
        .then((author) => {
          elasticSearch.indexProjectComponent(projectComponent, author);
        });
      return projectComponent;
    });
};

ProjectComponent.update = (userId, componentId, options) => {
  return dbProjectComponent.update(userId, componentId, options)
    .then((projectComponent) => {
      dbUser.getById(projectComponent.authorId)
        .then((author) => {
          elasticSearch.indexProjectComponent(projectComponent, author);
        });
      return projectComponent;
    });
};

ProjectComponent.delete = (userId, componentId) => {
  return dbProjectComponent.delete(userId, componentId)
    .then((data) => {
      elasticSearch.deleteProjectComponent(componentId);
      return data;
    });
};

module.exports = ProjectComponent;
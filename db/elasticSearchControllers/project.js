const elasticSearch = require('../../elasticSearch');
const dbProject = require('../models/project');
const dbUser = require('../models/user');

let Project = {...dbProject};

Project.create = (input) => {
  return dbProject.create(input)
    .then((project) => {
      dbUser.getById(project.ownerId)
        .then((owner) => {
          elasticSearch.indexProject(project, owner);
        });
      return project;
    });
};

// TODO - Update all component indices
Project.update = (input) => {
  return dbProject.update(input)
    .then((project) => {
      dbUser.getById(project.ownerId)
        .then((owner) => {
          elasticSearch.indexProject(project, owner);
        });
      return project;
    });
};

Project.delete = (userId, projectId) => {
  return dbProject.delete(userId, projectId)
    .then((data) => {
      elasticSearch.deleteProject(projectId);
      return data;
    });
};

module.exports = Project;
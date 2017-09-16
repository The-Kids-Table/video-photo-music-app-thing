const elasticSearch = require('../../elasticSearch');
const dbUser = require('../models/user');

let User = {...dbUser};

User.create = (input) => {
  return dbUser.create(input)
    .then((user) => {
      elasticSearch.indexUser(user);
      return user;
    });
};

// TODO - Update all user-related elasticsearch indices
User.update = (userId, query) => {
  return dbUser.update(userId, query)
    .then((user) => {
      elasticSearch.indexUser(user);
      return user;
    });
};

module.exports = User;
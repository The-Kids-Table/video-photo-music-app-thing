const elasticsearch = require('elasticsearch');
const _index = 'qraft';
const esClient = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST || 'localhost:9200',
  log: 'error'
});
let queue = [];
const clearQueue = () => {
  if (queue.length) {
    esClient.bulk({
      body: queue
    }, (err, res) => {
      if (err) {
        console.log('Error updating elastic search indices:', err);
      } else {
        console.log('Elastic search indices updated');
      }
    });
    queue = [];
  }
};

setInterval(clearQueue, process.env.ELASTICSEARCH_UPDATE_INTERVAL || 5000);

/////////////////////////////////////////////////////////////////////////
//////////////////////---Elasticsearch Functions---//////////////////////
/////////////////////////////////////////////////////////////////////////

module.exports.indexProject = (project, owner) => {
  queue.push({index: {_index, _type: 'project', _id: project.id}});
  queue.push({
    name: project.name,
    description: project.description,
    owner: {
      username: owner.username,
      name: owner.name,
      avatarUrl: owner.avatarUrl
    }
  });
};

module.exports.deleteProject = (projectId) => {
  queue.push({delete: {_index, _type: 'project', _id: projectId}});
};

module.exports.indexUser = (user) => {
  queue.push({index: {_index, _type: 'user', _id: user.id}});
  queue.push({
    username: user.username,
    name: user.name,
    profession: user.profession,
    avatarUrl: user.avatarUrl
  });
};

module.exports.indexProjectComponent = (projectComponent, author) => {
  queue.push({index: {_index, _type: 'projectComponent', _id: projectComponent.id}});
  queue.push({
    name: projectComponent.name,
    author: {
      username: author.username,
      name: author.name,
      profession: author.profession,
      avatarUrl: author.avatarUrl
    }
  });
};

module.exports.deleteProjectComponent = (componentId) => {
  queue.push({delete: {_index, _type: 'projectComponent', _id: componentId}});
};
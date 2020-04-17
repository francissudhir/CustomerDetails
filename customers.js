

var url = require('url');

module.exports = function(config) {

  var data1 = {
    projectId: config.projectId,
    keyFilename: config.keyFilename
  };

  const {Datastore}  = require('@google-cloud/datastore');
  const datastore = new Datastore(data1)

  const {Storage}  = require('@google-cloud/storage');
  const storage = new Storage(data1)

  var bucket = storage.bucket(config.bucketName);

  function getAllCustomers(callback) {
    var query = datastore.createQuery(['Customers']);
    datastore.runQuery(query, (err, customers) => callback(err, customers, datastore.KEY));
  }

  function getCustomers(userId, callback) {
    const key = datastore.key(['Customers', parseInt(userId)]);
    var query = datastore.createQuery(['Customers']).filter('__key__', '=', key);
    datastore.runQuery(query, (err, customers) => callback(err, customers, datastore.KEY));
  }

  return {
    getAllCustomers: getAllCustomers,
    getCustomers: getCustomers
  };
};

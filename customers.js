
module.exports = function(config) {

  var data1 = {
    projectId: config.projectId,
    keyFilename: config.keyFilename
  };

  const {Datastore}  = require('@google-cloud/datastore');
  const datastore = new Datastore(data1)

  var entityKind = 'Customers'

  function getCustomers(callback) {
    const query = datastore.createQuery([entityKind]);
    datastore.runQuery(query, (err, customers) => callback(err, customers, datastore.KEY));
  }

  function getCustomer(userId, callback) {
    const key = datastore.key([entityKind, parseInt(userId)]);
    const query = datastore.createQuery([entityKind]).filter('__key__', '=', key);
    datastore.runQuery(query, (err, customers) => callback(err, customers, datastore.KEY));
  }

  return {
    getCustomers: getCustomers,
    getCustomer: getCustomer
  };
};
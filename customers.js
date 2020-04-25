
module.exports = function(config) {

  var data1 = {
    projectId: config.projectId,
    keyFilename: config.keyFilename
  };

  const {Datastore}  = require('@google-cloud/datastore');
  const datastore = new Datastore(data1)



  function getCustomers(callback) {
    var query = datastore.createQuery(['Customers']);
    datastore.runQuery(query, (err, customers) => callback(err, customers, datastore.KEY));
  }

  function getCustomer(userId, callback) {
    const key = datastore.key(['Customers', parseInt(userId)]);
    var query = datastore.createQuery(['Customers']).filter('__key__', '=', key);
    datastore.runQuery(query, (err, customers) => callback(err, customers, datastore.KEY));
  }

  return {
    getCustomers: getCustomers,
    getCustomer: getCustomer
  };
};
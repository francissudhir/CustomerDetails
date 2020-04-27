var config = require('./config');
var customers = require('./customers')(config);
var express = require('express');
var session = require('cookie-session')
var app = express();
app.enable('trust proxy');
app.use(session({ signed: true, secret: config.cookieSecret }));


app.get('/getCustomers', function(req, res, next) {
  customers.getCustomers(function(err, customers, key) {
    if (err) return next(err);
    var keyCustomer = customers.map((customer) => Object.assign(customer, { id: customer.id || customer[key].id }));
    var getCustomers = [];
    keyCustomer.forEach(function(cus){
      getCustomers.push({"CustomerName": cus.CustomerName, "id": cus.id})
    })
    res.json(getCustomers);
  });
});


app.get('/getCustomer/:id', function(req, res, next) {
  customers.getCustomer(req.params.id, function(err, customers, key) {
    if (err) return next(err);
    var getCustomer = customers.map((customer) => Object.assign(customer, { id: customer.id || customer[key].id }));
    res.json(getCustomer);
  });
});

app.get('/_ah/health', function(req, res) {
  res.type('text').send('ok');
});

/* Run web application */
app.listen(8080);

console.log('Running on http://localhost:8080/');
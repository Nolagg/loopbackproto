var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.dataSources.oracleDS;
ds.discoverAndBuildModels('F0911', {schema: 'public'}, function(err, models) {
  if (err) throw err;

  models.Account.find(function(err, accounts) {
    if (err) return console.log(err);

    console.log(accounts);

    ds.disconnect();
  });
});
'use strict';

const copyData = require('../../server/apiWorld/apiFunctions.js').copyData;

module.exports=function(db2F0911) {
    // this is the implementation of the remote method
    db2F0911.moveData = function(targetApi,chunkSize, cb) {
        console.log('my target Api is ' + targetApi + ' and the chunkSize I will be using is ' + chunkSize);
        copyData('db2F0911', targetApi, chunkSize)
        .then(jsonData => {
          console.log('back from copyData');
          for (var i = 0; i < jsonData.length; i++) {
            console.log(jsonData[i].api + ' count ' + jsonData[i].count);
          }
        });
        cb(null, {"targetApi": targetApi,
                  "chunkSize": chunkSize});

    };
    // this is the definition of the remote method
    db2F0911.remoteMethod('moveData', {
        description: "Moves all data from one api endpoint to another api endpoint",
        accepts: [{arg: "targetAPI", 
                   description: "The name of the API where the data will be moved to",
                   type: "String", 
                   required: true
                  },
                  {arg: "chunkSize",
                   description: "The amount of rows that will be processed in one transaction (max 1000 rows)", 
                   type: "Number", 
                   required: true,
                  }
                ],
        http: {
            path: "/moveAllData",
            verb: "get"
        },
        returns: { arg: "TotalRows", type: "Number"}
    });
};
'use strict';

const myLoopback = require('../httpWorld/httpCommon').myLoopback;
const loopbackBaseURL = require('../config/config').loopbackBaseURL;

// This is a generic GET using an Axios HTTP instance defined in httpCommpon
// All 'GETS' can be routed through getLoopback
let getLoopback = (resourceURL) => {
  return new Promise((resolve, reject) => {
    myLoopback.get(resourceURL)
            .then(response => {
              resolve(response.data);
            })
            .catch((error) => {
              console.log('Error picked up on Get' + error);
              // reject(error);
            });
  });
};

// This is a generic POST using an Axios HTTP instance defined in httpCommpon
// All 'POSTS' can be routed through postLoopback
let postLoopback = (resourceURL, bodyData) => {
  return new Promise((resolve, reject) => {
    myLoopback.post(resourceURL, bodyData)
              .then(response => {
                resolve(response.data);
              })
              .catch((error) => {
                console.log('Error picked up on Post' + error);
                // reject(error);
              });
  });
};

// Get the count of all records first then post the data to each of the target APIs
let copyData = (srcApiURL, trgApiURL, chunkSize) => {
  return new Promise((resolve, reject) => {
    var apiObj = {};
    var apiObjs = [];
    var currentPos = 0;
    var postCount = 0;
    getLoopback(srcApiURL + '/count')
            .then(data => {
              var total = data.count;
              console.log('Source api ' + srcApiURL  + ' count: ' + total + '.');
              for (var i = 0; i < total / chunkSize; i++) {
                getLoopback(srcApiURL + '?filter[limit]=' + chunkSize + '&filter[skip]=' + currentPos)
                   .then(data => {
                     console.log('Got ' + data.length + ' records from ' + srcApiURL + '..');
                     postLoopback(trgApiURL, data)
                       .then(data => {
                         console.log('Posted ' + data.length + ' records .');
                         postCount += parseFloat(data.length);
                       });
                   });
                currentPos = currentPos + parseFloat(chunkSize);
              }
              apiObj = {'api': srcApiURL, 'count': data.count};
              apiObjs.push(apiObj);
            });
    // console.log(postCount + ' records posted to ' + trgApiURL);
    resolve(apiObjs);
  });
};

module.exports = {
  copyData: copyData};

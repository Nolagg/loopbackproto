'use strict';

const copyData = require('../apiWorld/apiFunctions').copyData;
const prompt = require('prompt');

const srcApi = {
  properties: {
    srcApiURL: {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Name of Source API - must be a valid API',
      required: true},
    trgApiURL: {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Name of Source API - must be a valid API',
      required: true},
    chunkSize: {
      pattern: /^([1-9][0-9]{0,2}|1000)$/,
      message: 'Chunk Size (1 - 1000)',
      required: true}}};

let processAPI = () => {
  prompt.start();
  prompt.get(srcApi, function(err, result) {
    console.log('Input received.  Now moving data from ' + result.srcApiURL +
                     ' in chunks of ' + result.chunkSize + ' records.');
    copyData(result.srcApiURL, result.trgApiURL, result.chunkSize)
         .then(jsonData => {
           console.log('back from copyData');
           for (var i = 0; i < jsonData.length; i++) {
             console.log(jsonData[i].api + ' count ' + jsonData[i].count);
           }
         });
  });
};

processAPI();

module.exports = {
  processAPIData: processAPI};

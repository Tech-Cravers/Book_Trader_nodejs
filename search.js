const { google } = require('googleapis') ;
const readLine = require('readline');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { file } = require('googleapis/build/src/apis/file');
dotenv.config();

const KEYFILEPATH = path.join(__dirname, '/book-trader-0-22a19b16b67f.json');

const SCOPES = ['https://www.googleapis.com/auth/drive', 'profile'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
  });

const drive = google.drive({version: 'v3', auth});

var pageToken = null;
// Using the NPM module 'async'
async.doWhilst(function (callback) {
  drive.files.list({
    q: "mimeType='image/jpeg'",
    fields: 'nextPageToken, files(id, name)',
    spaces: 'drive',
    pageToken: pageToken
  }, function (err, res) {
    if (err) {
      // Handle error
      console.error(err);
      callback(err)
    } else {
      res.files.forEach(function (file) {
        console.log('Found file: ', file.name, file.id);
      });
      pageToken = res.nextPageToken;
      callback();
    }
  });
}, function () {
  return !!pageToken;
}, function (err) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    // All pages fetched
  }
})
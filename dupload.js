
const { google } = require('googleapis') ;
const readLine = require('readline');
const path = require('path');
const fs = require('fs');
const { file } = require('googleapis/build/src/apis/file');

// service account key file from Google Cloud console.
const KEYFILEPATH = path.join(__dirname, '/book-trader-0-22a19b16b67f.json');

// Request full drive scope and profile scope, giving full access to google drive as well as the users basic profile information.
const SCOPES = ['https://www.googleapis.com/auth/drive', ];

// Create a service account initialize with the service account key file and scope needed
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES
});

async function uploadfile(){

  const driveService = google.drive({version: 'v3', auth});

  let fileMetadata = {
    'name': 'icon.png',
    'parents':  [  '1VIRGEYLR_LPVKDULGlR0fICxFWVdMdbO'  ]
  };

  let media = {
    mimeType: 'image/png',
    body: fs.createReadStream('wishes.png')
  };

  let response = await driveService.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  });

  switch(response.status){
    case 200:
        let file = response.result;
        console.log('Created File Id: ', response.data.id);
        break;
    default:
        console.error('Error creating the file, ' + response.errors);
        break;
  }

}

uploadfile().catch(console.error);

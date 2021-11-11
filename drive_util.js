//drive logic starts here 

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

const filePath  = path.join(__dirname, '/uploads/1636614059951-930248484.pdf');

async function uploadFile(fileName='ready.pdf',file_DIR=filePath){
    
    let fileMetaData = {
        'name': fileName,
        'parents': [  '1VIRGEYLR_LPVKDULGlR0fICxFWVdMdbO'  ]
    }

    let media = {
        mimeType:'application/pdf',
        body: fs.createReadStream(file_DIR)
    }
    let response = await drive.files.create({
        resource : fileMetaData,
        media: media,
        fields:'id'
    });

    switch(response.status){
        case 200:
            let file = response.result;
            console.log('*********************************************************************');
            console.log('Created File ID: '+response.data.id);
            break;
        default:
            console.log(response.errors)
            break;
    }
}

async function deleteFile(fileID){
    try{
        const response = await drive.files.delete({
            fileId:fileID
        })
        console.log(response.data,response.status);
    }
    catch(error){
        console.log(error.message);
    }
}

async function linkgen(fileID = '1s0dn0XEmbNKVhCZ2L_KoXYkd1xrGLul0'){

    try{

        
        await drive.permissions.create({
            fileId: fileID,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        });

        const result = await drive.files.get({
            fileId: fileID,
            fields: 'webViewLink, webContentLink'
        });

        console.log(result.data);
    }
    catch(error){
        console.log(error.message);
    }
}
//uploadFile();
//deleteFile();
//linkgen('1wVs98oLTPU_x4ATQkJnL0GenFsYqP4Qh');
//createNupload('GitNotesForProfessionals.pdf','D:\\Project\\major project\\Book_Trader_nodejs\\GitNotesForProfessionals.pdf').catch(console.error);

module.exports = {uploadFile,deleteFile,linkgen}
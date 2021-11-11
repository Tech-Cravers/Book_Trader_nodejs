//drive logic starts here 

const { google } = require('googleapis') ;
const readLine = require('readline');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { file } = require('googleapis/build/src/apis/file');
dotenv.config();

const KEY_FILE_PATH = path.join(__dirname, '/book-trader-0-22a19b16b67f.json');

const SCOPES = ['htttps://www.googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth( {
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES
});

const drive = google.drive({
    version: 'v3',
    auth: auth
});

const filePath  = path.join(__dirname, '/uploads/ready.pdf');

async function createNupload(fileName='ready.pdf',file_DIR=filePath){
    let fileMetaData = {
        'name': fileName,
        'parents':['1VIRGEYLR_LPVKDULGlR0fICxFWVdMdbO']

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
            console.log('File ID'+response.id)
            break;
        default:
            console.log(response.errors)
            break;
    }
}
async function uploadFile(){
    try{
        const response = await drive.files.create({
            requestBody: {
                name: 'ready.pdf',
                mimeType:'application/pdf'
            },
            media: {
                mimeType:'application/pdf',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data);
    }
    
    catch(error){
        console.log(error)
    }
    
}

async function deleteFile(){
    try{
        const response = await drive.files.delete({
            fileId: '1qzdhI_nHldLiZJG4Kp1CI_SJaCQecSHL'
        })
        console.log(response.data,response.status);
    }
    catch(error){
        console.log(error.message);
    }
}

async function linkgen(){

    try{

        const fileID = '1RG0mzACaICFMAmRZvHsS_8xWnXBzQIhD';
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
//linkgen();

module.exports = {uploadFile,deleteFile,linkgen,createNupload}
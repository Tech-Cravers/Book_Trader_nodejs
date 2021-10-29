console.log("Running app.js");

//module imports
var routes = require("./routes");

const express = require('express');
const app = express();

//app.set('views', '../views')
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public'));

//ROUTES
app.use(routes);

//starting the server
const PORT = 5000|| process.env.PORT;
app.listen(PORT, () => console.log(`Hey Im running on port ${PORT}`));



/*
//drive logic starts here 
const { google } = require('googleapis') ;
const path = require('path')
//const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath  = path.join (__dirname, '/uploads/GitNotesForProfessionals.pdf')

async function uploadFile(){
    try{
        const response = await drive.files.create({
            requestBody: {
                name: 'testPDF.pdf',
                //filePath: '/MyDrive',
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
        console.log(error.message)
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
*/
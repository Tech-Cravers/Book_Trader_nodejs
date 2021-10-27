console.log("Running app.js");

//module imports
var routes = require("./routes");
//var ocr = require("./upload_ocr");


const express = require('express');
const app = express();
const fs = require("fs");
const multer = require('multer');
const { dirname } = require('path');
const { createWorker } = require("tesseract.js");
const worker = createWorker({
  logger: m => console.log(m),
});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage}).single("fileName");

//app.set('views', '../views')
app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public'));

//ROUTES
app.use(routes);


app.get('/',function(req,res){
    res.render('upload');
});

//app.use(ocr);
app.post('/uploads',(req,res) => {
    

    upload(req,res, err => {
        fs.readFile(`./uploads/${req.file.originalname}`,(err,data) => {

            if (err) return console.log('ERROR : ',err);

            //pdf to jpeg
            

            //OCR worker
 /*           
            (async () => {
                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');
                
                const { data: { text } } = await worker.recognize(data)
                .catch((err)=>{
                    console.log(err)
                })
                .finally(async ()=>{
                    await worker.terminate();
                });

                console.log(text);
                //res.send(text);


                
                //await worker.terminate();
                
            })();
*/
            //uploading to  drive
            //uploadFile();
            res.redirect('/download');
                
            console.log(err);    
        });
    });
});

app.get('/download', (req,res) => {
    const file = `${__dirname}/uploads/wishes.png`;
    res.download(file);
    res.redirect('/');
})

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
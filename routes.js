//module imports
var express = require("express");
var router = express.Router();

const fs = require("fs");
const multer = require('multer');
var routes = require("./routes");
var pdfText = require("./pdf2text")
var ocr = require("./ocr")
const drive = require("./drive_util")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage}).single("fileName");

router.get('/',function(req,res){
    res.render('index');
});

router.get('/shop',function(req,res){
    res.render('shop-grid');
});

router.get('/upload',function(req,res){
    res.render('upload');
});

router.get('/blog',function(req,res){
    res.render('blog');
});

//app.use(ocr);
router.post('/uploads',(req,res) => {
    

    upload(req,res, err => {
        fs.readFile(`./uploads/${req.file.originalname}`,(err,data) => {

            if (err) return console.log('ERROR : ',err);
            //pdf parser
            pdfText(data)

            //pdf to jpeg 

            //OCR worker 
            //ocr(data);

            
            //uploading to  drive
            drive.linkgen();

            res.redirect('/download');

            console.log(err)
        });
    });
});

router.get('/download', (req,res) => {
    const file = `${__dirname}/uploads/wishes.png`;
    res.download(file);
    res.redirect('/');
})


module.exports = router;
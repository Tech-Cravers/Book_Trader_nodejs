var pdf2image = require('pdf2image');
async function pdf2(){
//converts all the pages of the given pdf using the default options 
await pdf2image.convertPDF('GitNotesForProfessionals.pdf').then(
    function(pageList){
        console.log(pageList);
    }
).catch((err) =>{console.log(err)});

 }

 pdf2();
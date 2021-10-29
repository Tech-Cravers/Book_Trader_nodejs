const fs = require('fs')
const pdfparse = require('pdf-parse')

function pdfText(pdffile){
    //const pdffile = fs.readFileSync(filePath)

    const OPTIONS = {
        // internal page parser callback
        // you can set this option, if you need another format except raw text
        
        // max page number to parse
        max: 2,
        //check https://mozilla.github.io/pdf.js/getting_started/
        version: 'v1.10.100'
    }

    pdfparse(pdffile,OPTIONS).then(function (data){
        console.log(data.numpages)

        console.log(data.text)
    })
    .catch(function(error){
        console.log(error)
    })
}
//pdfText();

module.exports =  pdfText 



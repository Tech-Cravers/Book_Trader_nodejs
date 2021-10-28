const { createWorker } = require("tesseract.js");
const worker = createWorker({
  logger: m => console.log(m),
});
async function ocr(data){

    
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
}

module.exports = ocr
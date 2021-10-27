const path = require('path');
const { Poppler } = require("node-poppler");
const fs = require("fs").promises;

async function readTextFromPDF() {
    const uploadPath = __dirname + '/images/' + fileArr[0].name;
    fileArr[0].mv(uploadPath, function (err) {
        if (err)
            return err;
    })
    const file = uploadPath;
    const poppler = new Poppler("/usr/bin");
    const options = {
        firstPageToConvert: 1,
        lastPageToConvert: 1,
        //pngFile: true,
        //originalPageSizes: true
    };
    const outputFile = `test_document.png`;
    //const res = await poppler.pdfToCairo(file, outputFile, options)
    //console.log(res);
    const readableFile = await poppler.pdfToText(file, path.resolve(path.join(__dirname, "text", "parsed.txt")), options)
    console.log(readableFile);
}
async function convertPDFToPNG() {
    const uploadPath = __dirname + '/images/' + fileArr[0].name;
    fileArr[0].mv(uploadPath, function (err) {
        if (err)
            return err;
    })
    const file = uploadPath;
    const poppler = new Poppler("/usr/bin");
    const options = {
        firstPageToConvert: 1,
        lastPageToConvert: 1,
        //pngFile: true,
        //originalPageSizes: true
    };
    const outputFile = `test_document.png`;
    //const res = await poppler.pdfToCairo(file, outputFile, options)
    //console.log(res);
    const readableFile = await poppler.pdfToText(file, path.resolve(path.join(__dirname, "text", "parsed.txt")), options)
    console.log(readableFile);
}

module.exports = readTextFromPDF()
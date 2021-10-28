const path = require('path');
const { Poppler } = require("node-poppler");
const fs = require("fs").promises;

async function readTextFromPDF(fileArr) {
    const uploadPath = path.dirname(require.main.filename) + '/images/' + fileArr.name;

    fileArr.mv(uploadPath, function (err) {
        if (err)
            return err;
    })
    const file = uploadPath;
    const poppler = new Poppler("/usr/bin");
    const options = {
        firstPageToConvert: 1,
        lastPageToConvert: 1,
    };
    const readableFile = await poppler.pdfToText(
        file,
        undefined,
        options)
    console.log(readableFile);
    return readableFile
}

async function convertPDFToPNG(fileName, OCR) {
    const uploadPath = path.dirname(require.main.filename) + '/images/' + fileName;
    const poppler = new Poppler("/usr/bin");
    const options = {
        firstPageToConvert: 1,
        lastPageToConvert: 1,
        pngFile: true,
    };
    const outputFile = `${fileName}`;
    const res = await poppler.pdfToCairo(uploadPath, outputFile, options)
    const buffer = await fs.readFile(`${fileName}-1.png`)
    const text = await OCR.readImage(buffer)
    console.log(text);

    return text

}

module.exports.readTextFromPDF = readTextFromPDF
module.exports.convertPDFToPNG = convertPDFToPNG
const path = require('path');
const { Poppler } = require("node-poppler");
const fs = require("fs").promises;

async function readTextFromPDF(fileArr) {
    const uploadPath = path.dirname(require.main.filename) + '/images/' + fileArr.name;
    fileArr.mv(uploadPath, function (err) {
        if (err)
            return err;
    })
    const poppler = new Poppler("/usr/bin");
    const options = {
        firstPageToConvert: 1,
        lastPageToConvert: 1,
    };
    const readableFile = await poppler.pdfToText(
        uploadPath,
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
    await poppler.pdfToCairo(uploadPath, uploadPath, options)
    const buffer = await fs.readFile(`${uploadPath}-1.png`)
    const text = await OCR.readImage(buffer)
    console.log(text);
    return text
}

async function unlinkUnused(fileName) {
    const uploadPath = path.dirname(require.main.filename) + '/images/' + fileName;
    try {
        await fs.unlink(uploadPath)
        await fs.unlink(`${uploadPath}-1.png`)
    } catch (error) {
        console.log("Try remove  not existing file")
    }
}
module.exports.readTextFromPDF = readTextFromPDF
module.exports.convertPDFToPNG = convertPDFToPNG
module.exports.unlinkUnused = unlinkUnused
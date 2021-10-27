const { createWorker } = require("tesseract.js");

class OCR {

    constructor() {
        this.worker = createWorker({
            logger: (m) => console.log(m),
        });
    }

    async prepareWorker() {

        await this.worker.load();
        await this.worker.loadLanguage("pol");
        await this.worker.initialize("pol");
    }

    async readImage(buffer) {
        const {
            data: { text },
        } = await this.worker.recognize(buffer);
        return text
    }

}
module.exports.OCR = new OCR
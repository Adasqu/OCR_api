const app = require("fastify")({ logger: true });
const fileUpload = require("fastify-file-upload");
const { createWorker } = require("tesseract.js");
const { Poppler } = require("node-poppler");
const fs = require("fs").promises;
const path = require('path');


app.register(fileUpload, {
  useTempFiles: false,
  safeFileNames: true,
  preserveExtension: true
});
const worker = createWorker({
  logger: (m) => console.log(m),
});

(async () => {
  await worker.load();
  await worker.loadLanguage("pol");
  await worker.initialize("pol");
  //await worker.terminate();
})();
app.get("/upload", async function (req, reply) {
  reply.type("text/html");
  reply.send(`<html><body><form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" id="myFile" name="filename">
  <input type="submit">
</form>`);
});
app.post("/upload", async function (req, reply) {
  // some code to handle file
  const files = req.raw.files;
  console.log(files);
  let fileArr = [];
  for (let key in files) {
    fileArr.push({
      name: files[key].name,
      data: files[key].data,
      mimetype: files[key].mimetype,
      mv: files[key].mv
    });
  }

  // choose is pdf or image
  if (fileArr[0].mimetype == 'application/pdf') {

    reply.send(readableFile);
  } else {
    const buffer = Buffer.from(fileArr[0].data, "base64");
    //const image = await fs.readFile(path.join(root + outputFile));
    const {
      data: { text },
    } = await worker.recognize(buffer);

    console.log(text);
    reply.send(text);

  }

});
app.listen(3001, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`server listening on ${app.server.address().port}`);
});

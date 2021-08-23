var app = require("fastify")({ logger: true });
var fileUpload = require("fastify-file-upload");
var { createWorker } = require("tesseract.js");
const fs = require("fs");
app.register(fileUpload);

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
  fs;
  let fileArr = [];
  for (let key in files) {
    fileArr.push({
      name: files[key].name,
      data: files[key].data,
    });
  }
  const buffer = Buffer.from(fileArr[0].data, "base64");
  console.log(fileArr[0]);
  const {
    data: { text },
  } = await worker.recognize(buffer);
  console.log(text);
  reply.send(text);
});
app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`server listening on ${app.server.address().port}`);
});

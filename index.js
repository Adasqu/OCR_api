const app = require("fastify")({ logger: true });
const fileUpload = require("fastify-file-upload");
const { OCR } = require("./modules/ocr")


app.register(fileUpload, {
  useTempFiles: false,
  safeFileNames: true,
  preserveExtension: true
});


(async () => {
  await OCR.prepareWorker()
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

  } else {
    const buffer = Buffer.from(fileArr[0].data, "base64");
    const text = OCR.readImage(buffer)
    console.log(text);
    reply.send(text);

  }

});
app.listen(3001, '0.0.0.0', (err) => {
  if (err) throw err;
  console.log(`server listening on ${app.server.address().port}`);
});

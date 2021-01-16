var express = require("express");
const app = express();
const port = 3000;

var multer = require('multer');
var upload = multer({dest:'uploads/'});

app.post('/upload', upload.single('data'), (req, res) => {
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
});

app.get("/", (req, res) => {
    res.send("hello people");
});
app.listen(port, () => {
    console.log("listening to the port: " + port);
});

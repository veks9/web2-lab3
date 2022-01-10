const express = require("express");
const path = require("path");
var cors = require("cors");
const fs = require("fs");

let recordCollection;
fs.readFile("recordCollection.json", function (err, data) {
  recordCollection = JSON.parse(data);

  recordCollection = recordCollection.map(function (record, index) {
    return {
      id: index,
      ...record,
    };
  })
});

const app = express();
app.use(express.static('public'));
app.use(cors());

app.get("/recordCollection", function (req, res) {
  res.json(recordCollection);
});

const port = process.env.PORT || 8888
app.listen(port, function () {
  console.log(`Server listening on http://${this.address().address}:${this.address().port}`);
});

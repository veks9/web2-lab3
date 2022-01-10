const express = require("express");
const path = require("path");
var cors = require("cors");
const fs = require("fs");

let recordCollection;
fs.readFile("./recordCollection.json", function (err, data) {
  recordCollection = JSON.parse(data);

  recordCollection = recordCollection.map(function (record, index) {
    return {
      id: index,
      ...record,
    };
  })
});

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get("/recordCollection", function (req, res) {
  res.json(recordCollection);
});

const port = process.env.PORT || 8888;
if (process.env.PORT) {
  app.listen(process.env.PORT);
} else {
  app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
  });
};

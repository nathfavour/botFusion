const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

let fileCount = 0; // Initialize file count

// alert("enter prompts")

// app.use(bodyParser.text());
app.use(express.json());

// app.use(express.text());

app.post('/input', (req, res) => {
  const userInput = req.body;
  console.log(userInput)

  // Create the INPUT directory if it doesn't exist
  if (!fs.existsSync('INPUT')) {
    fs.mkdirSync('INPUT');
  }

  // Generate a unique file name
  let fileName;
  do {
    fileCount++;
    fileName = path.join('INPUT', String(fileCount));
  } while (fs.existsSync(fileName));

  // Write the request body to the file
  fs.writeFile(fileName, JSON.stringify(userInput), (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(3000);
















// const express = require('express');
// const app = express();
// let userInput = '';
// let botResponse = '';
//
// app.use(express.text());
//
// app.post('/input', (req, res) => {
//   userInput = req.body;
//   res.sendStatus(200);
// });
//
// app.get('/input', (req, res) => {
//   res.send(userInput);
//   userInput = '';
// });
//
// app.post('/response', (req, res) => {
//   botResponse = req.body;
//   res.sendStatus(200);
// });
//
// app.get('/response', (req, res) => {
//   res.send(botResponse);
//   botResponse = '';
// });
//
// app.listen(3000);
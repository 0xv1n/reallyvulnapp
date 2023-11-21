const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/browse', (req, res) => {
  const directory = req.body.directory || '.';
  const command = `${directory}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.send(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      res.send(`Error: ${stderr}`);
      return;
    }
    res.send(`<pre>${stdout}</pre>`);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

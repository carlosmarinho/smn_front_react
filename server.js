const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, './build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('*', function (req, res) {

  const filePath = path.resolve(__dirname, './build', 'index.html');
  res.sendFile(filePath);

});

console.log("Server loading on port: ", process.env.PORT || 21040)
app.listen(process.env.PORT || 21040);

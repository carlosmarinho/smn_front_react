const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const fs = require('fs')

app.use(express.static(path.join(__dirname, './build')));


app.get('/ping', function (req, res) {
 return res.send('pong');
});


/* app.get('/*', function (req, res) {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  res.sendFile(filePath);
}); */
 
app.get('/*', function (req, res) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, './build', 'index.html');

  

}); 


console.log("Server loading on port: ", process.env.PORT || 21041)
app.listen(process.env.PORT || 21041);

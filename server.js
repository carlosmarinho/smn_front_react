const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const fs = require('fs')

const MetaTagsServer = require('react-meta-tags/server');
const MetaTagsContext = require('react-meta-tags');

//app.use(express.static(path.join(__dirname, './build')));


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

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, 'Home Page');
    data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
    result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');

    console.log(result);
    res.send(result);
  });

}); 

app.use(express.static(path.resolve(__dirname, './build')));


console.log("Server loading on port: ", process.env.PORT || 21041)
app.listen(process.env.PORT || 21041);

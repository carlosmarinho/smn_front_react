const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const MetaTagsServer = require('react-meta-tags/server');
const MetaTagsContext = require('react-meta-tags');

app.use(express.static(path.join(__dirname, './build')));

console.log("testeeeeee:")

app.get('/ping', function (req, res) {
 return res.send('pong');
});


app.get('/guia', function (req, res) {
  console.log("aquiiiiiiiiiiiiiii no /")
  const metaTagsInstance = MetaTagsServer();
  const meta = metaTagsInstance.renderToString();
  console.log("metaaaaa:", meta);
  const filePath = path.resolve(__dirname, './build', 'index.html');
  res.sendFile(filePath);

});

console.log("Server loading on port: ", process.env.PORT || 21040)
app.listen(process.env.PORT || 21040);

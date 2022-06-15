const express = require('express');

var bodyParser = require('body-parser');

const app = express();

var path = require('path');

const cors = require('cors');

app.use(bodyParser.json());

var swaggerConfig = require('./utils/swaggerConfig.js')(app);

var logger = require('./utils/logger.js')(app);

app.use('/admin', (req, res, next) => {
    if (process.env !== 'development') {
      var result = req.url.match(/^\/js\/(maps|src)\/.+\.js$/)
      if (result) {
        return res.status(403).end('403 Forbidden')
      }
    }
    next();
});
app.use('/admin', express.static(path.join(__dirname, '/admin')));


app.get('/', (req, res) => {
    res.status(200).end("App is running...")
});


var v1 = require('./routes/v1.js');
const { env } = require('process');
app.use('/v1', cors(), v1);



const hostname = '0.0.0.0'
const port = 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
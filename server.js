const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const bodyParser = require('body-parser');

const app = express();


// serve static files from React
app.use(express.static(path.join(__dirname, '/app/build')));

//using body-parser as middleware to handle json req
app.use(bodyParser.json())

// create API endpoints for db
const router = jsonServer.router('reports.json');
const middlewares = jsonServer.defaults();
app.use('/api', router);

// catch-all handler for React code
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/app/build/index.html'));
});

// set up port for app to run on
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App running on port ${port}`);

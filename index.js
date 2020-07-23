const express = require('express');
const http = require('http');
const moragn = require('morgan');
const bodyparser = require('body-parser');

const dishrouter = require('./routes/dishRouter');
const promorouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(moragn('dev'));
app.use(bodyparser.json()); //allow us to parse the body of the request message which is formatted in json format  


app.use('/dishes', dishrouter);
app.use('/dishes/:dishId', dishrouter);
app.use('/promotions', promorouter);
app.use('/promotions/:promoid', promorouter);
app.use('/leaders', leaderRouter);
app.use('/leaders/:leaderid', leaderRouter);

app.use(express.static(__dirname+ '/public'));

app.use((req, res, next )=> { //next is an optional parameter 
     //console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end("<html><body><h1>this is an express server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, ()=> {
    console.log(`server running at http://${hostname}:${port}`);  
});

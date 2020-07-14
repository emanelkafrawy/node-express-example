const express = require('express');
const http = require('http');
const moragn = require('morgan');

const hostname = 'localhost';
const port = 2000;

const app = express();
app.use(moragn('dev'));

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

const express = require('express');
const http = require('http');
const moragn = require('morgan');
const bodyparser = require('body-parser');

const hostname = 'localhost';
const port = 2000;

const app = express();
app.use(moragn('dev'));
app.use(bodyparser.json()); //allow us to parse the body of the request message which is formatted in json format  

app.all('/dishes',(req,res,next)=>{ //for all the requests, no matter method is invoked 

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); //plaintext back to the client
    next();

});//callback function 

app.get('/dishes',(req,res,next)=>{
    res.end("will send all the dishes to you!");
});

app.post('/dishes',(req,res,next)=>{
    res.end("will add the dishes " + req.body.name +
    "with details: " + req.body.description);
});

app.put('/dishes',(req,res,next)=>{
    res.statusCode = 403;   //means operation is not suported  
    res.end("put operation not supported on dishes");
}); 

app.delete('/dishes',(req,res,next)=>{
    res.end("deleting all the dishs ");
});

//with id
app.get('/dishes/:dishId',(req,res,next)=>{
    res.end("will send " + req.params.dishId + "for you!");
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode = 403;   //means operation is not suported  
    res.end("post operation not supported on dishes/" + req.params.dishId);
});

app.put('/dishes/:dishId',(req,res,next)=>{
    res.write("will update the dish " + req.params.dishId + "\n"); //write can add a line to the reply of the message
    res.end("will update the dish" + req.body.name + 
    'with deatails' + req.body.description );
}); 

app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end("deleting the dishe " + req.params.dishId);
});

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

var http = require('http');
var serv = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end('<h1>Hello world!</h1>');
});
serv.listen(8080);
var EventEmitter = require('events').EventEmitter;
var a = new EventEmitter;
a.on('event',function(){
	console.log('event call');
});
a.emit('event');

let http = require('http'),
	fs = require('fs');
	let reg = /^\/images\/.+(\.jpg)$/;
let server = http.createServer((req,res)=>{
	if(req.method=="GET" && reg.test(req.url)){
		fs.stat(__dirname+req.url,(err,stat)=>{
			if(err||!stat.isFile()){
				res.writeHead(404);
				res.end("404 Not Found");
				return;
			}
			server(__dirname+req.url,"application/jpg");
		});
	}else if(req.method=="GET" && req.url=="/"){
		server(__dirname+"/index.html","text/html");
	}else {
		res.writeHead(404);
		res.end("404 Not Found");
	}
	function server(path,type){
		res.writeHead(200,{"Content-Type":type});
		fs.createReadStream(path).pipe(res);
	}
});
server.listen(8080);

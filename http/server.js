let http = require('http');
let qs = require('querystring');
let sev = http.createServer(function(req,res){
	if('/'===req.url){
		res.writeHead(200,{"Content-Type":"text/html"});
		res.end(['<form method="POST" action="/url">',
				 '<h1>My form</h1>',
				 '<fieldset>',
				 '<label>Personal information</label>',
				 '<p>What is your name?</p>',
				 '<input type="text" name="name">',
				 '<p><button>Submit</button></p>',
				 '</form>'].join(""));
	}else if('/url'===req.url && req.method == "POST"){
		let body = '';
		req.on('data',function(chunk){
			body += chunk;
		});
		req.on('end',function(){
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end('<p>Content-Type: '+req.headers['content-type']+'</p>'+
					'<p>Data: '+qs.parse(body).name+'</p>');
		});
	}else{
		res.writeHead(404);
		res.end('404 Not Found');
	}
});
sev.listen(8080);
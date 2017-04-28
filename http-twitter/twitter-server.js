let http = require('http'),
	qs = require('querystring');
let sev = http.createServer(function(req,res){
	let body = '';
	req.on('data',function(chunk){
		body += chunk;
	});
	req.on('end',function(){
		res.writeHead(200);
		res.end('Done');
		console.log('got name \033[96m'+qs.parse(body).name+'\033[39m');
	});
});
sev.listen(8080);
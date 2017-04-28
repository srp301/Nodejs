let http = require('http'),
	qs = require('querystring');

function send(theName){
	let request = http.request({
		host:'127.0.0.1',
		port:8080,
		url:'/',
		method:'POST'
	},function(res){
		res.setEncoding('utf8');
		res.on('data',(chunk)=>{console.log(chunk);});
		res.on('end',function(){
			console.log('\033[90m request complete!\033[39m');
			process.stdout.write('Your name:');
		});
	});
	request.end(qs.stringify({name:theName}));
}
process.stdout.write('Your name:');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data',function(chunk){
	send(chunk.replace('\n',''));
});

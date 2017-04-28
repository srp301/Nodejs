let http = require('http'),
	qs = require('querystring');
let search = process.argv.slice(2).join(' ').trim();
if(!search.length){
	return console.log('\n Usage: node twitter <search term>');
}
console.log('searching for \033[96m'+search+'\033[39m');
http.request({
	host:"search.twitter.com",
	path:"/search.json?"+qs.stringify({q:search})
},(res)=>{
	var body = '';
	res.setEncoding('utf-8');
	res.on('data',(chunk)=>{
		body+=chunk;
	});
	res.on('end',()=>{
		let obj = JSON.parse(body);
		/*obj.results.forEach((twitter)=>{
			console.log('\033[90m'+twitter.text+'\033[39m');
			console.log('\033[94m'+twitter.from_user+'\033[39m');
			console.log('--');
		});*/
	});
}).end();

/*
http.get({
	host:'search.twitter.com',
	path:'/search.json?'+qs.stringify({q:search})
},(res)=>{
	var body='';
	res.setEncoding('utf-8');
	res.on('data',(chunk)=>{
		body+=chunk;
	});
	res.on('end',()=>{
		let obj = JSON.parse(body);
		obj.results.forEach((twitter)=>{
			console.log('\033[90m'+twitter.text+'\033[39m');
			console.log('\033[94m'+twitter.from_user+'\033[39m');
			console.log('--');
		});
	});
}).end();
*/
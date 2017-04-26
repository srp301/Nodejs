/*
	模块依赖
 */
var net = require('net');

/*
	追踪连接数
 */
var count = 0,
	users = {};

/*
	创建服务器
 */
var server = net.createServer(function(conn){
	conn.setEncoding('UTF-8');
	conn.write(
		'\n> welcome to \033[92mnode-char\033[39m!\n>'+
		count+' other people are connected at this time'+
		'\n> please write your username and press enter:'
	);
	count++;
	var username;
	conn.on('data',function(chunk){
		chunk = chunk.replace("\r\n",'');
		if(!username){
			if(users[chunk]){
				conn.write('> this username already in use,try again:');
			}else{
				username = chunk;
				users[username] = conn;
				for(var i in users){
					var a = "> "+ username+" join the room\n";
					broadcast(a);
				}
			}
		}else{
			for(var i in users){
				if(i!=username){
					broadcast('> '+ username +' : '+chunk+'\n',true);
				}
			}
		}
	});
	console.log('count:'+count);
	conn.on('close',function(){
		delete users[username];
		count--;
		broadcast('> '+username+' left the room');
	});
	function broadcast(msg,exceptMyself){
		for(var i in users){
			if(!exceptMyself||i!=username){
				users[i].write(msg);
			}
		}
	}
});
/*
	监听
 */
server.listen(8080,function(){
	console.log('server listening on *: 8080');
});

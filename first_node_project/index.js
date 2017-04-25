/*
	module dependencies.
 */
var fs = require('fs'),
	stdin = process.stdin,
	stdout = process.stdout;

fs.readdir(__dirname, function(err,files){
	console.log(files);
});
fs.readdir(process.cwd(), function(err,files){
	console.log('');
	if(!files.length){
		return console.log("No files to show!");
	}
	console.log('Select which file or directory you want to see\n');
	var states = [];
	function file(i){
		var filename = files[i];
		fs.stat(__dirname+'/'+filename,function(err,stat){
			states[i] = stat;
			if(stat.isDirectory()){
				console.log(" "+(i)+" "+filename+"/");
			}else{
				console.log(" "+(i)+" "+filename);
			}
			if(++i==files.length){
				read();
			}else {
				file(i);
			}
		});
	}
	file(0);

	function read(){
		console.log('');
		stdout.write('Enter your choice: ');
		stdin.resume();
		stdin.setEncoding('UTF-8');
		stdin.on('data',option);
	}

	function option(data){
		var filename = files[Number(data)];
		if(!filename){
			stdout.write('Enter your choice: ');
		}else{
			stdout.pause();
			if(states[Number(data)].isDirectory()){
				fs.readdir(__dirname+'/'+filename,'utf-8',function(err,files){
					console.log('');
					if(typeof files ===Object){
						console.log('( '+files.length+'files )');
					files.forEach(function(file){
						console.log(' - '+file);
					});
						console.log('');
					}else{
						stdout.write('Enter your choice: ');
					}
				});
			}else{
				fs.readFile(__dirname+'/'+filename,'utf-8',function(err,data){
					console.log('');
					console.log(data);
					process.exit(1);
				});
			}
			
		}
	}
});




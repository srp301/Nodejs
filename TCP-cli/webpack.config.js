module.exports = {
	entry:{
		example3:__dirname+"/app/example.js",
		example4:__dirname+"/app/example2.js"
	},
	output:{
		path:__dirname+"/public",
		filename:"[name].js"
	},
	module:{
		loaders:[
			{
				test:/\.js/,
				loader:"babel-loader"
			}
		]
	}
};
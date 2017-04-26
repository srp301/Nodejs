module.exports = {
	entry:__dirname+"/main.js",
	output:{
		path:__dirname,
		filename:"bundle.js"
	},
	module:{
		loaders:[
			{
				test:/\.js/,
				loader:"babel-loader",
			}
		]
	}
};
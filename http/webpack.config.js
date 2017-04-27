module.exports = {
	entry:__dirname+'/server.js',
	output:{
		path:__dirname,
		filename:'bundle.js'
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
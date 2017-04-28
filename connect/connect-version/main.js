let connect = require('connect');
let server = connect.createServer();
server.use(connect.state(__dirname+"/website"));
server.listen(8080);
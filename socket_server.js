var http = require('http');
var	socketIO = require('socket.io');
var	port = process.env.PORT || 8080;
//var	ip = process.env.IP || '192.168.1.5';
var count_client = 0;

server = http.createServer().listen(port, function(){
	console.log('Socket.IO server started at %s:%s!', port);
}),

/* server = http.createServer().listen(port, function(){
	console.log('Socket.IO server started at: %s!', port);
}), */

io = socketIO.listen(server);
io.set('match origin protocol', true);
io.set('origins', '*:*');
	
var run = function(socket){
	count_client++;
	console.log('Server connected to client: ' + count_client);
	
	// Receive data from client
	socket.on('create_table', function(data){
		console.log('create_table: ' + data);
		//var table_id = Math.floor((Math.random() * 10) + 1);
		// Send data to client
		socket.emit('create_table', JSON.parse(data));
	})
	
	// Receive data from client
	socket.on('user', function(data){
		var address = socket.handshake.address;
		console.log('New connection from ' + address.address + ':' + address.port);
		console.log('Data from client: ', data);
		// Send data to client
		socket.broadcast.emit('hello-user', data);
	})
}

io.sockets.on('connection', run);
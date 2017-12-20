var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

//Serve Index Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//Serve Driver Page
app.get('/driver', function(req, res){
  res.sendFile(__dirname + '/driver.html');
});

//Serve User Page
app.get('/user', function(req, res){
  res.sendFile(__dirname + '/user.html');
});

//Log Socket Connection
io.on('connection', function(socket){
  //TODO Verify User
  console.log('a user connected');
//Listen to User Location
socket.on('send_user_location', function(msg){
  console.log(msg);
  //On receive emit the Location to Driver
  io.emit('receive_user_location', msg);
        });

//Listen to Driver Location 
socket.on('send_driver_location', function(msg){
  console.log(msg);
  //On Receive emit the Location to User
  io.emit('receive_driver_location', msg);
        });
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
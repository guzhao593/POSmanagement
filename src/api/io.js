var io = require('socket.io')();
io.on("connection", function(client){
    client.on('pay', function(data){
        io.emit("ok", 'true');
    })
})
io.listen(8818)



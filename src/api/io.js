var io = require('socket.io')();


io.on("connection", function(client){
    client.on('pay', function(data){
        console.log(data);
        io.emit("ok", 'true');
    })
    // client.on('send', function(data){
    //     console.log(data);
    //     io.emit("send", data);
    // })
})
io.listen(8818)
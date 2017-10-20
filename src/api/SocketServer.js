var SocketServer = require('ws').Server;
var ws = new SocketServer({
    port: 888
})

ws.on("connection", function(client){
    console.log('connection');
    console.log(client._ultron.id);
    client.on("message", function(_data){
        var id = client._ultron.id;
        console.log(_data);
        ws.broadcast('nnns');
    })

})

ws.broadcast = function broadcast(_messageObj, id) {  
    ws.clients.forEach(function(client) { 
        if(client._ultron.id != id){
        client.send(JSON.stringify(_messageObj))
        }
    });  
}; 
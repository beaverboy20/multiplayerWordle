/*
import {Peer} from "https://esm.sh/peerjs@1.5.4?bundle-deps"

function send(message){
    var peer = new Peer();
    var conn = peer.connect('another-peers-id');
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(){
      // here you have conn.id
      conn.send(message);
    });
};

function recieve(){
    peer.on('connection', function(conn) {
        conn.on('data', function(data){
        console.log(data);
        });
    });
}
*/
const R = require('ramda');

class PacketInsert {
    constructor(db) {
        if (!db.open) {
            throw new Error("Database not valid.");
        }
        this.db = db;
    }

    dbInsert(packetInput){
        var self = this;
        var packetInsertDb = {};
        // return new Promise(function (resolve, reject) {
            packetInsertDb.timestamp = packetInput.timestamp;

            packetInsertDb.frame = packetInput.layers.frame ? JSON.stringify(Object.assign({},
                {
                // length:packetInput.layers.frame.frame_frame_len,
                protocols:packetInput.layers.frame.frame_frame_protocols
                })) : null;
            
            packetInsertDb.eth = packetInput.layers.eth ?  JSON.stringify(Object.assign({},
                {
                dstResolved:packetInput.layers.eth.eth_dst_eth_dst_resolved,
                srcResolved:packetInput.layers.eth.eth_src_eth_src_resolved,
                src:packetInput.layers.eth.eth_eth_src,
                dst:packetInput.layers.eth.eth_eth_dst,
                })) : null;

            packetInsertDb.ip = packetInput.layers.ip ? JSON.stringify(Object.assign({},
                {version:packetInput.layers.ip.ip_ip_version,
                src:packetInput.layers.ip.ip_ip_src,
                // srcHost:packetInput.layers.ip.ip_ip_src_host,
                dst:packetInput.layers.ip.ip_ip_dst,
                // dstHost:packetInput.layers.ip.ip_ip_dst_host
                })) : null;

            packetInsertDb.tcp = packetInput.layers.tcp ? JSON.stringify(Object.assign({},
                {srcPort:packetInput.layers.tcp.tcp_tcp_srcport,
                dstPort:packetInput.layers.tcp.tcp_tcp_dstport,
                payload:null,
                payloadSize:packetInput.layers.tcp.tcp_tcp_payload ? packetInput.layers.tcp.tcp_tcp_payload.length : 0
                })) : null;

            // packetInsertDb.udp = packetInput.layers.udp ? JSON.stringify(packetInput.layers.udp) : null;
            packetInsertDb.udp = null;

            self.db.run("INSERT INTO packet VALUES (?,?,?,?,?,?,?,?,?)",
                [null,
                packetInsertDb.timestamp, 
                null,
                // Object.keys(packetInput.layers ? packetInput.layers : {}), 
                packetInsertDb.frame,
                packetInsertDb.eth,
                packetInsertDb.ip,
                packetInsertDb.tcp,
                packetInsertDb.udp,
                null], function (err) {
                    if (err) {
                        throw err;
                        // reject(err);
                    }
                // resolve(packetInsertDb);
            });
        // });
    }

    readWholeFile(allRows){
        var self = this;
        var arr = allRows.toString().split('\n');
        console.log('Lines in File',arr.length);
        for (var i = 0; i < arr.length; i=i+1) {
            try {
                var packet = JSON.parse(arr[i]);
                if (packet && packet.layers) {
                    self.dbInsert(packet);
                    // .then(
                    // (res)=>{/*console.log('.')*/},
                    // (err)=>{console.error(err)});
                }else{
                    // console.log(i,'Skipping line',packet);
                }
            } catch (error) {
                    
            }
        }
    }

    transformForInsert(packet){}

    insert(){}
}
  
export default PacketInsert;
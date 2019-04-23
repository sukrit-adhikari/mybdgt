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
        return new Promise(function (resolve, reject) {
            packetInsertDb.timestamp = packetInput.timestamp;
            console.log(packetInput.layers.frame);
            packetInsertDb.frame = JSON.stringify(Object.assign({},{protocols:packetInput.layers.frame.frame_frame_protocols}));
            packetInsertDb.eth = JSON.stringify(packetInput.layers.eth);
            packetInsertDb.ip = JSON.stringify(packetInput.layers.ip);
            packetInsertDb.tcp = packetInput.layers.tcp ? JSON.stringify(packetInput.layers.tcp) : null;
            packetInsertDb.udp = packetInput.layers.udp ? JSON.stringify(packetInput.layers.udp) : null;
            self.db.run("INSERT INTO packet VALUES (?,?,?,?,?,?,?,?)",
                [null,
                packetInsertDb.timestamp, 
                packetInsertDb.frame,
                packetInsertDb.eth,
                packetInsertDb.ip,
                packetInsertDb.tcp,
                packetInsertDb.udp,
                null], function (err) {
                    if (err) {
                        reject(err);
                    }
                resolve(packetInsertDb);
            });
        });
    }

    readWholeFile(rawString){
        var self = this;
        var arr = String(rawString).split('\n');
        for (var i = 0; i < arr.length; i++) {
            try {
                var packet = JSON.parse(arr[i]);
                if (packet && packet.layers) {
                    self.dbInsert(packet).then((res)=>{/*console.log("Success")*/},(err)=>{console.error(Error)});
                }
            } catch (error) {
                    
            }
        }
    }

    transformForInsert(packet){}

    insert(){}
}
  
export default PacketInsert;
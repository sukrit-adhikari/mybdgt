const R = require('ramda');

class PacketInsert {
    constructor(db) {
        // if (!db.open) {
        //     throw new Error("Database not valid.");
        // }
        // this.db = db;
    }

    readWholeFile(rawString){
        try {
            var packet = JSON.parse(rawString);
            if (packet && packet.layers) {
                console.log(Object.keys(packet.layers).includes('tcp'));
            }
        } catch (error) {
                
        }
    }

    transformForInsert(packet){}

    insert(){}
}
  
export default PacketInsert;
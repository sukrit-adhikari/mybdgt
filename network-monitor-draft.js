var fs = require('fs');
var path = process.argv[2];

var invalidPacketPair = [null,null];
var packetCount = 0;

var displayTCPPacket = function(rawString){
    try {
        var packet = JSON.parse(rawString);
        if(packet.layers){
            console.log("Valid Packet with layers " + Object.keys(packet.layers));
            console.log(++packetCount);
        }
    } catch (error) {
        if(invalidPacketPair[0] === null &&  invalidPacketPair[1] === null){
            invalidPacketPair[0] = rawString;
        }else if(invalidPacketPair[1] === null && invalidPacketPair[0]){
            var rebuiltPacket = invalidPacketPair[0]+rawString;
            // displayTCPPacket(rebuiltPacket);
            invalidPacketPair[0] = null;
            invalidPacketPair[1] = null;
        }else{
            // console.log("Invalid Packet \n"+rawString);
        }               
    }
}

var allData = "";

fs.readdir(path, function (err, items) {
    for (var i = 0; i < items.length; i++) {
        var file = path + '/' + items[i];
        console.log("File: " + file);
        if(String(file).indexOf('cap_') < 0){
            continue;
        }
        var spawn = require('child_process').spawn,
            ls = spawn('tshark', ['-r', file, '-T', 'ek']);

        ls.on('exit', function (code, signal) {
            console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
        });

        var test = [];
        ls.stdout.on('data', function (data) {
            // if(data || data.length > 0){
            var arr = String(data).split('\n');
            for (var i = 0; i < arr.length; i++) {
                displayTCPPacket(arr[i]);
                
            }
            // }
        });

        ls.stderr.on('data', function (data) {
            console.log('Stderr ' + data);
        });

        ls.on('close', function (code) {
            console.log('child process exited with code ' + code);
        });
    }
});
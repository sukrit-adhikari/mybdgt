const exec = require('child_process').exec;
var fs = require('fs');
const uuidv4 = require('uuid/v4');

var displayTCPPacket = function(rawString){
    try {
        var packet = JSON.parse(rawString);
        if(packet.layers){
            console.log("Valid Packet with layers " + Object.keys(packet.layers));
        }
    } catch (error) {
        // if(invalidPacketPair[0] === null &&  invalidPacketPair[1] === null){
            // invalidPacketPair[0] = rawString;
        // }else if(invalidPacketPair[1] === null && invalidPacketPair[0]){
            // var rebuiltPacket = invalidPacketPair[0]+rawString;
            // displayTCPPacket(rebuiltPacket);
            // invalidPacketPair[0] = null;
            // invalidPacketPair[1] = null;
        // }else{
            // console.log("Invalid Packet \n"+rawString);
        // }               
    }
}


class NetMon {

    constructor() {
        var netMonUUID = uuidv4();
        
        const mountLocalLocation = '/tmp/'+process.env.cap_file_location_start+'-'+netMonUUID;
        const mountRAMSize = process.env.cap_ram_size;
        const capFilesize = process.env.cap_file_size;
        const capFileStart = process.env.cap_file_start+'-'+netMonUUID.substring(0,8);
        
        const cmdCreateMount = 'sudo mkdir '+mountLocalLocation;
        const cmdMountRAM = 'sudo mount -t tmpfs -o size='+mountRAMSize+ ' tmpfs '+mountLocalLocation;
        const cmdStartCap = 'sudo tshark -b filesize:'+capFilesize+' -w '+mountLocalLocation+'/'+capFileStart;
        
        console.log('mountLocalLocation',mountLocalLocation);
        console.log('mountRAMSize',mountRAMSize);
        console.log('capFilesize',capFilesize);
        console.log('capFileStart',capFileStart);

        console.log('cmdCreateMount',cmdCreateMount);
        console.log('cmdMountRAM',cmdMountRAM);
        console.log('cmdStartCap',cmdStartCap);

        this.initCap(cmdCreateMount,cmdMountRAM,cmdStartCap);

        var self = this;
        setInterval(function(){
            self.initCapRead(mountLocalLocation,capFileStart);
        },5000);
    }

    initCap(cmdCreateMount,cmdMountRAM,cmdStartCap){
        exec(cmdCreateMount);
        exec(cmdMountRAM);
        exec(cmdStartCap);
    }

    initCapRead(path,filePattern){
        fs.readdir(path, function (err, items) {
            for (var i = 0; i < items.length; i++) {
                var file = path + '/' + items[i];
                console.log("File: " + file);
                if(String(file).indexOf(filePattern) < 0){
                    continue;
                }
                var spawn = require('child_process').spawn,
                    ls = spawn('tshark', ['-r', file, '-T', 'ek']);
        
                ls.on('exit', function (code, signal) {
                    console.log('child process exited with ' +
                        `code ${code} and signal ${signal}`);
                });

                ls.stdout.on('data', function (data) {
                    var arr = String(data).split('\n');
                    for (var i = 0; i < arr.length; i++) {
                        displayTCPPacket(arr[i]);
                    }
                });
        
                ls.stderr.on('data', function (data) {
                    console.log('Stderr ' + data);
                });
        
                ls.on('close', function (code) {
                    console.log('child process exited with code ' + code);
                });
            }
        });
    }

}

export default NetMon;
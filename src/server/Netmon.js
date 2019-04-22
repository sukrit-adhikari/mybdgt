const exec = require('child_process').exec;
var fs = require('fs');
const uuidv4 = require('uuid/v4');

const processedFiles = [];

var displayTCPPacket = function (rawString) {
    try {
        var packet = JSON.parse(rawString);
        
        if (packet && packet.layers) {
            console.log(JSON.stringify(Object.keys(packet.layers)));
            // console.log("Valid Packet with layers " + Object.keys(packet.layers));
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

        const mountLocalLocation = '/tmp/' + process.env.cap_file_location_start + '-' + netMonUUID;
        const mountRAMSize = process.env.cap_ram_size;
        const capFilesize = process.env.cap_file_size;
        const capFilePattern = process.env.cap_file_pattern + '-' + netMonUUID.substring(0, 8);

        const cmdCreateMount = 'sudo mkdir ' + mountLocalLocation;
        const cmdMountRAM = 'sudo mount -t tmpfs -o size=' + mountRAMSize + ' tmpfs ' + mountLocalLocation;
        const cmdStartCap = 'sudo tshark -b filesize:' + capFilesize + ' -w ' + mountLocalLocation + '/' + capFilePattern;

        console.log('mountLocalLocation', mountLocalLocation);
        console.log('mountRAMSize', mountRAMSize);
        console.log('capFilesize', capFilesize);
        console.log('capFilePattern', capFilePattern);

        console.log('cmdCreateMount', cmdCreateMount);
        console.log('cmdMountRAM', cmdMountRAM);
        console.log('cmdStartCap', cmdStartCap);

        this.initCap(cmdCreateMount, cmdMountRAM, cmdStartCap);

        var self = this;
        setInterval(function () {
            self.initCapRead(mountLocalLocation, capFilePattern);
        }, 5000);
    }

    initCap(cmdCreateMount, cmdMountRAM, cmdStartCap) {
        exec(cmdCreateMount);
        exec(cmdMountRAM);
        exec(cmdStartCap);
    }

    initCapRead(path, filePattern) {
        console.log(path, filePattern);
        fs.readdir(path, function (err, items) {
            for (var i = 0; i < items.length; i++) {
                var file = path + '/' + items[i];
                console.log("Input File", file);
                if (processedFiles.includes(items[i]) || String(file).indexOf(filePattern) < 0) {
                    console.log("Ignoring File", items[i]);
                    continue;
                }
                processedFiles.push(items[i]);
                console.log("Processing File", file);
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
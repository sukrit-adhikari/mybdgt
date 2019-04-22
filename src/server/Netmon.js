import PacketInsertClass from './service/packetInsert.js';
const exec = require('child_process').exec;
var fs = require('fs');
const uuidv4 = require('uuid/v4');
const processedFiles = [];
let packetInsert = {};

class NetMon {

    constructor(dataBase) {
        var netMonUUID = uuidv4();
        packetInsert = new PacketInsertClass(dataBase);

        const mountLocalLocation = '/tmp/' + process.env.cap_file_location_start + '-' + netMonUUID;
        const mountRAMSize = process.env.cap_ram_size;
        const capFilesize = process.env.cap_file_size;
        const capFilePattern = process.env.cap_file_pattern + '-' + netMonUUID.substring(0, 8);

        const cmdCreateMount = 'mkdir ' + mountLocalLocation;
        const cmdMountRAM = 'mount -t tmpfs -o size=' + mountRAMSize + ' tmpfs ' + mountLocalLocation;
        const cmdStartCap = 'tshark -b filesize:' + capFilesize + ' -w ' + mountLocalLocation + '/' + capFilePattern;

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
        fs.readdir(path, function (err, items) {
            if(items.length < 2){
                console.log("Skipping packet read since there is just 1 file in the directory.");
                return ; // Wait for a full file so there is no error while reading a half baked binary file
            }
            console.log('Ignoring last file',items.pop());
            for (var i = 0; i < items.length; i++) {
                var file = path + '/' + items[i];
                console.log("Input File", file);

                if (processedFiles.includes(items[i]) || String(file).indexOf(filePattern) < 0) {
                    console.log("Ignoring File", items[i]);
                    continue;
                }

                processedFiles.push(items[i]);
                console.log("Processing File", file);
                var binData = '';
                var spawn = require('child_process').spawn,
                    ls = spawn('tshark', ['-r', file, '-T', 'ek']);

                ls.on('exit', function (code, signal) {
                    console.log('child process exited with '+`code ${code} and signal ${signal}`);
                });

                ls.stdout.on('data', function (data) {
                    binData=binData+data;
                });

                ls.stderr.on('data', function (data) {
                    console.log('Stderr '+ data);
                });

                ls.on('close', function (code) {
                    packetInsert.readWholeFile(binData);
                    console.log('child process exited with code ' + code);
                });

            }
        });
    }
}

export default NetMon;
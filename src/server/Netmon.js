import PacketInsertClass from './service/packetInsert.js';
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
var fs = require('fs');
const uuidv4 = require('uuid/v4');
const processedFiles = [];
let packetInsert = {};
const deleteFileList = [];
let processingFileCount = 0;
class NetMon {

    constructor(dataBase) {
        var netMonUUID = uuidv4();
        packetInsert = new PacketInsertClass(dataBase);

        const mountLocalLocation = '/tmp/' + process.env.cap_file_location_start + '-' + netMonUUID.substring(0, 8);
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
            self.removeProcessedFiles();
            console.log('Busy','count',processingFileCount);
            if(processingFileCount > 2){
                console.log('Busy','Skipping');
                return;
            }
        }, 500);
    }

    removeProcessedFiles(){
        const removeFileCmd = 'rm ';
        const item = deleteFileList.pop();
        if(item && item.toString() && item.indexOf('/tmp')===0){ // be safe
            console.log('Deleting file',item);
            exec(removeFileCmd+item);
        }
    }

    initCap(cmdCreateMount, cmdMountRAM, cmdStartCap) {
        exec(cmdCreateMount);
        exec(cmdMountRAM);
        exec(cmdStartCap);
    }

    initCapRead(path, filePattern) {
        fs.readdir(path, function (err, allItems) {
            if(allItems.length < 2){
                console.log('No of files',allItems.length,'Skipping');
                return ; // Wait for a full file so there is no error while reading a half baked binary file
            }
            const items = allItems.sort().reverse().slice(0, 3);
            console.log('Ignoring last file',items.pop());
            for (var i = 0; i < items.length; i++) {
                var file = path + '/' + items[i];

                if (processedFiles.includes(items[i]) || String(file).indexOf(filePattern) < 0) {
                    console.log("Ignoring File", items[i]);
                    continue;
                }

                processedFiles.push(items[i]);
                console.log("Processing File", file);
                processingFileCount = processingFileCount+1;
                
                var ls = spawnSync('tshark', ['-r', file, '-T', 'ek']);

                processingFileCount = processingFileCount-1;
                packetInsert.readWholeFile(ls.output);
                // if(parseInt(code) !== 0){
                //     console.log('Child process exited with code ' + code);
                // }
                console.log('Adding',file,'to delete list');
                deleteFileList.push(file);

            }
        });
    }
}

export default NetMon;
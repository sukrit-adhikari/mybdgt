const exec = require('child_process').exec;
var env = require('node-env-file');

class InitNetMon {
    constructor() {
      
    }

    init(){
        var netMonUUID = parseInt(100 * Math.random());
        const mountLocalLocation = '/tmp/'+process.env.cap_file_location_start+'-'+netMonUUID;
        const mountRAMSize = process.env.cap_ram_size;
        const capFilesize = process.env.cap_file_size;
        const capFileStart = process.env.cap_file_start+'-'+netMonUUID;
        const cmdCreateMount = 'sudo mkdir '+mountLocalLocation;
        const cmdMountRAM = 'sudo mount -t tmpfs -o size='+mountRAMSize+ ' tmpfs '+mountLocalLocation;
        const cmdStartCap = 'sudo tshark -b filesize:'+capFilesize+' -w '+mountLocalLocation+'/'+capFileStart;
        console.log( mountLocalLocation);
        exec(cmdCreateMount);
        exec(cmdMountRAM);
        exec(cmdStartCap);
    }

}

export default InitNetMon;
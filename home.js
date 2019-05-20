


const path = require("path");
const os = require("os");
const fs = require("fs");
const EventEmitter = require("events");
const Logger = require("./app");
const logger = new Logger();
//console.log(logger);
logger.on("logmessage", (arg) => {
    console.log("loged file",arg);
})

logger.log("Tolu");

var pathobj = path.parse(__dirname);
console.log(pathobj);

///
var freememory = os.freemem();
var totalmemory = os.totalmem();

console.log(`free memory : ${freememory} and total memory is ${totalmemory}`);

//
fs.readdir('./',function(err,file){
    if(err) console.log(`error : ${err}`)
    else console.log(file);
})

/////////



//emitter.emit("logevent", {id:"1",message:"loged"});




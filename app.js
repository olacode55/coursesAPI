const EventEmitter = require("events");

class Logger extends EventEmitter{
  log(name){
  console.log("HELLO "+ name);  
  

  this.emit("logmessage", {id:"1",message:"i need help"});
  }
 
}

module.exports = Logger;

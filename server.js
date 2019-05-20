
const http = require("http");
var _ = require("underscore");
const server = http.createServer((req , res)=>{
if(req.url === '/'){
    res.write('hello word');
    if(_.contains([1,2,3,4],4)){
    res.write('It contains 4');
    }
    res.end();
}
if(req.url ==='/api/student'){
    res.write(JSON.stringify([1 , 2, 3 ]));
    res.end();
}
});


server.listen(3000);

console.log("listening on port 3000");
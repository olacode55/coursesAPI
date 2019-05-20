
class middleware{
logger(req, res ,next){
    console.log("Logging");
    next();
}


Autheticate(req , res , next){
    console.log("Authenticating");
    next();
}

}
module.exports = middleware;
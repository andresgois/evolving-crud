

module.exports = function (req, res, next) {
    console.log('LOGGED');
    //console.log(req.file)
    /*const img = null;
    if(!req.file.location){
        img = "http://localhost:3000/user/files/"+req.file.key
    }
    img = "https://crudjsaws.s3.amazonaws.com/"+req.file.key*/
    //const img = req.file.location? req.file.location : req.file.key;
    next();
  };
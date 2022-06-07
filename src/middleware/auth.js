const { verify } = require('jsonwebtoken')

module.exports = function (req, res, next) {
  console.log('Auth')
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new Error("Token missing!");    
  }

  const [, token] = authHeader.split(" ");

  try {
    const d = verify(token, process.env.JWT_SECRET);
    console.log(d)

    next();
  } catch(e) {
    throw new Error("Invalid token!");
  }

}
const UserService = require('@User/services/UserService')
const { verify } = require('jsonwebtoken')

const userService = new UserService();

module.exports = function (req, res, next) {
  console.log('Aqui')
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new Error("Token missing!");    
  }

  const [, token] = authHeader.split(" ");

  const { id } = verify(token, process.env.JWT_SECRET);
  const user = userService.verifyAdmin(id)

  if(!user){
    throw new Error("User isn't admin!")
  }

  return next();
}
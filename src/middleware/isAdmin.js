const UserService = require('@User/services/UserService')
const { verify } = require('jsonwebtoken')

const userService = new UserService();

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new Error("Token missing!");    
  }

  const [, token] = authHeader.split(" ");

  const { id } = verify(token, process.env.JWT_SECRET);
  const user = await userService.verifyAdmin(id)
  //console.log(user)

  if(!user){
    throw new Error("User isn't admin!")
  }

  return next();
}
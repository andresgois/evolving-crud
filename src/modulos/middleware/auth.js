const { verify } = require('jsonwebtoken')

module.exports = function (req, res, next) {
    console.log('Aqui')
  const authHeader = req.headers.authorization;

  if(!authHeader){
    throw new Error("Token missing!");    
  }

  const [, token] = authHeader.split(" ");

  try {
    const d = verify(token, process.env.JWT_SECRET);
    console.log(d)
    //const usersRepository = new UsersRepository();

    //const user = await usersRepository.findById(user_id);
    // const user = await userTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    // if(!user){
    //   throw new AppError("User does not exists!", 401);
    // }

    // request.user = {
    //   id: user_id,
    // };

    next();
  } catch(e) {
    throw new Error("Invalid token!");
  }

}
/*
module.exports = function Authenticate(error, req, res, next) {
    if (error instanceof Error) {
        return res.status(404).json({
            status: 'error',
            message: `${error.message}`,
        })
    }

    return res.status(500).json({
        status: 'error',
        message: `Internal server error - ${error.message}`,
    })
    next();
}*/
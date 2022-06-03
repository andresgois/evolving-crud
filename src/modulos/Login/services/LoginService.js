const UserRepository = require('../../User/repository/UserRepository');
const { compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')

class LoginService {

    async login(email, senha){
        const user = await UserRepository.listUserByEmail(email)
        var token = null;

        if(!user){
            throw new Error("Invalid login!");
        }

        const compareUser = await compare(senha, user.senha);
        if(compareUser){
            token = sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'} );
        }
       
       return {
           email,
           token
       }; 
    }
}

module.exports = LoginService;
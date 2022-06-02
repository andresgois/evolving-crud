const removerImg = require('../../../helps/removeImg');
const UserRepository = require('../repository/UserRepository');

class UserService {

    async index(){
        const users = await UserRepository.listAllUsers();

        return users;
    }

    async indexOne(id){
        var user = await UserRepository.listUser(id)
        if(!user){
            throw new Error("User not found!");
        }
       return user; 
    }

    async store(name, email,senha, imagem, cep,logradouro,complemento,bairro,localidade,uf ){
        // verificar se estão todos os dados
        var user = await UserRepository.createUser(
            name, email,senha, imagem, cep,logradouro,complemento,bairro,localidade,uf 
        );

        return  user;
    }

    async delete(id){
        var user = await UserRepository.listUser(id)
        //const imgDelete = user.imagem.split('files/')[1]
        const imgDelete = user.imagem;
        console.log(imgDelete)
        if(!user){
            throw new Error("User not found!");
        }
        try {            
            await UserRepository.deleteUser(id)
        } catch (error) {
            throw new Error(`Erro ao deletar dados: ${error.message}`)
        }
        removerImg(imgDelete)
        return;
     }
    /*
    update(id, name, age){
       var user = this.users.find( u => u.id === id);
       var position = this.users.indexOf(user);
       
        Object.assign(this.users[position], { 
            name: name, 
            age: age 
        } );
        
       return  user
    }*/
}

module.exports = UserService;
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

    async store(name, imagem, cep,logradouro,complemento,bairro,localidade,uf ){
        // verificar se estão todos os dados
        var user = await UserRepository.createUser(
            name, imagem, cep,logradouro,complemento,bairro,localidade,uf 
        );

        return  user;
    }

    async delete(id){
        var user = await UserRepository.listUser(id)
        if(!user){
            throw new Error("User not found!");
        }
        await UserRepository.
         
        return;
     }
    /*
    indexOne(id){
        var user = this.users.find( u => u.id === id);
        if(!user){
            throw new Error("User not found!");
        }
       return user; 
    }
    update(id, name, age){
       var user = this.users.find( u => u.id === id);
       var position = this.users.indexOf(user);
       
        Object.assign(this.users[position], { 
            name: name, 
            age: age 
        } );
        
       return  user
    }

    delete(id){
       var user = this.users.find( u => u.id === id);
       var position = this.users.indexOf(user);
       
       this.users.splice(position, 1)
        
       return
    }*/
}

module.exports = UserService;
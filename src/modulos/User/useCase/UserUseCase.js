const User = require('../models/UserModel');
const { v4: uuid } = require('uuid')

class UserUseCase {
    constructor(){
        this.users = [];
    }

    index(){
       return this.users; 
    }

    indexOne(id){
        var user = this.users.find( u => u.id === id);
        if(!user){
            throw new Error("User not found!");
        }
       return user; 
    }

    store(name, age){
       var user = new User(uuid(), name, age ); 
       return  this.users.push(user)
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
    }
}

module.exports = UserUseCase;
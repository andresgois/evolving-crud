const prisma = require("../../../database/prismaClient");

async function listAllPost(){
   const result = await prisma.post.findMany()
}

async function createPost( descricao ){
    
    /*const end = await prisma.address.create({

    })*/

    const result = await prisma.post.create({
        data: {
            descricao: descricao,
                   }
    });
    
    return result;
}


module.exports = { listAllUsers, createUser }
const prisma = require("../../../database/prismaClient");

async function listAllPost(){
   const result = await prisma.post.findMany()
}

async function createPost( descricao ){

    const result = await prisma.post.create({
        data: {
            descricao: descricao,
        }
    });
    
    return result;
}


module.exports = { listAllPost, createPost }
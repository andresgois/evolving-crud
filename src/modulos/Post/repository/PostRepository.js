const prisma = require("../../../database/prismaClient");

async function listAllPost(){
   const result = await prisma.post.findMany();
   return result;
}

async function createPost( descricao ){

    const result = await prisma.post.create({
        data: {
            descricao: descricao,
        }
    });
    
    return result;
}

async function updatePost( id, descricao ){
    const result = await prisma.post.update({
        where: { id: id},
        data: { descricao: descricao}
    });
    return result;
}

async function deletePost( id ) {
    const result = await prisma.post.delete({
        where: { id: id}
    });
    return result;
}


module.exports = { listAllPost, createPost, updatePost, deletePost }
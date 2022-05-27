const prisma = require("../../../database/prismaClient");

async function listAllUsers(){
    //const result = await prisma.user.findMany({
    const result = await prisma.user.findMany({
        include: {
            Address: true,
        }
    });
    
    return result;
}

async function listUser(id){
    const result = await prisma.user.findFirst({
        where: { id: id},
        include: { Address: true }
    })
    return result
}

async function createUser(name, imagem, cep,logradouro,complemento,bairro,localidade,uf ){

    const result = await prisma.user.create({
        data: {
            name: name,
            imagem: imagem,
            Address: {
                create: {
                    cep,
                    complemento,
                    localidade,
                    bairro,
                    logradouro,
                    uf
                }
            }
        }
    });
    
    return result;
}

async function deleteUser(id){
    const result = await prisma.user.delete({
        where: { id: id},
        include: { Address: true }
    })
    return result
}


module.exports = { listAllUsers, createUser, listUser, deleteUser}
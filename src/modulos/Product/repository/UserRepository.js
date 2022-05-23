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

async function createUser(name, imagem, cep,logradouro,complemento,bairro,localidade,uf ){
    
    /*const end = await prisma.address.create({

    })*/

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


module.exports = { listAllUsers, createUser }
const prisma = require("../../../database/prismaClient");
const { hash } = require('bcrypt');

async function listAllUsers(){
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

async function listUserByEmail(email){
    const result = await prisma.user.findFirst({
        where: { email},
    })
    return result
}

async function createUser(name,email,senha, imagem, cep,logradouro,complemento,bairro,localidade,uf ){
    const senhaHash = await hash(senha, 8);
    const result = await prisma.user.create({
        data: {
            name: name,
            imagem: imagem,
            email: email,
            senha: senhaHash,
            admin: false,
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

async function turnIntoAdministrator(id){
    const result = await prisma.user.update({
        where: { id: id},
        data: { admin: true }
    })
    return result
}


module.exports = { listAllUsers, createUser, listUser, deleteUser, listUserByEmail, turnIntoAdministrator}
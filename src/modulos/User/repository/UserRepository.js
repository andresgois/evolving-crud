const prisma = require("../../../database/prismaClient");
const { hash } = require('bcrypt');

async function listAllUsers(){
    const result = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            admin: true,
            imagem: true,
            Address: {
                select: {
                    logradouro: true,
                    bairro: true,
                    localidade: true,
                    uf: true,
                }
            }
          },
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

async function updateUser(id, name,email,senha, imagem, cep,logradouro,complemento,bairro,localidade,uf ){
    const user = await prisma.user.findFirst({  where: { id },include: { Address: true } });

    const result = await prisma.user.update({
        where: { id },
        data: {
            name: name ? name : user.name,
            email: email ? email : user.email,
            senha: senha ? await hash(senha, 8) : user.senha,
            imagem: imagem ? imagem : user.imagem,
            admin: user.admin,
            Address: {
                update: {
                    where: { id: user.Address[0].id },
                    data: {
                        cep: cep ? cep : user.Address[0].cep,
                        logradouro: logradouro ? logradouro : user.Address[0].logradouro,
                        complemento: complemento ? complemento : user.Address[0].complemento,
                        bairro: bairro ? bairro : user.Address[0].bairro,
                        localidade: localidade ? localidade : user.Address[0].localidade,
                        uf: uf ? uf : user.Address[0].uf
                    }
                }
            }
        }
    });
    
    return result;
}

async function deleteUser(id){
    const result = await prisma.user.delete({
        where: { id: id}
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


module.exports = { listAllUsers, createUser, listUser, updateUser, deleteUser, listUserByEmail, turnIntoAdministrator}
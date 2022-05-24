const axios = require('axios');

describe('Test in User', () => {

    beforeAll(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/user',
            data: {
                name: 'Fred',
                age: 25
            }
        });
    });

    //afterAll()

    test('should be list user', async function () {
        const response = await axios({
            url: 'http://localhost:3000/users',
            method: 'get'
        });

        const user = response.data
        console.log(user);
        //expect(user).toBe([]);
        expect(user).toHaveLength(1);
    });

    test('should be create user', async function () {
        await axios({
            url: 'http://localhost:3000/user',
            method: 'post',
            data: {
                name: 'Andre',
                age: 33
            }
        });

        const response = await axios({
            url: 'http://localhost:3000/users',
            method: 'get'
        });

        const user1 = response.data
        console.log(user1[0]);
        expect(user1[0]).toHaveProperty("id");
    });

    test('should be create user', async function () {
        await axios({
            url: 'http://localhost:3000/user',
            method: 'post',
            data: {
                name: 'Andre',
                age: 33
            }
        });

        const list = await axios({
            url: 'http://localhost:3000/users',
            method: 'get'
        });

        const user = list.data
        console.log(user);
        console.log(user[0].id);

        const del = await axios({
            url: 'http://localhost:3000/user/'+user[0].id,
            method: 'delete'
        });
        console.log(del);

        expect(del[0]).not.toHaveProperty("id",user[0].id);
    });

});
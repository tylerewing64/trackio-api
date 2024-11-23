const { expect, test } = require('@jest/globals');
const {User} = require('../models/userModel')

const user = new User();

const tyler ={ 
    username: "test", 
    password: 'test', 
    email: 'tyler', 
    firstname: 'tyler', 
    lastname: 'been'
}
test('Testing password to sh256', async() => { 
    const token = await user.authorizeUser('tester', 'test');
        expect(token).toBe(''); 
})
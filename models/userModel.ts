import { PrismaClient, users as PrismaUser } from "@prisma/client";
import crypto from 'crypto';
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

interface UserSchema { 
    username: string,
    password: string, 
    email: string, 
    firstname: string, 
    lastname: string
}


export default class User { 

    private hashPassword(password:string): string { 
        const hash = crypto.createHash('sha256');
        hash.update(password); 
        const hashedString = hash.digest('hex');
        return hashedString;
    }

    public async authorizeUser(username: string, password: string): Promise<string | null> { // Change return type to string | null
    try { 
        const hashedPassword = this.hashPassword(password); 
        const user = await prisma.users.findFirst({ 
            where: { 
                username: username
            }
        });
        
        if (!user) { 
            throw new Error('User not found');
        }

        // Compare the hashed password
        if (user.password_hash === hashedPassword) { 
           
            const secretKey = 'test-for-now';
            const payload = { userId: user.id, username: user.username }; // You can select specific properties for the payload
            const options = { 
                expiresIn: '2h' 
            };
            // Create the JWT token
            const token = jwt.sign(payload, secretKey, options);
            return token; 
        }

        // Return null if passwords don't match
        return null;
    } catch (error) { 
        console.error(error);
        return null;
    } 
}

    public async createUser(user: UserSchema):Promise<PrismaUser | null>{ 
       
        const hashedPassword = this.hashPassword(user.password); 
        const newUser = await prisma.users.create({ 
            data: { 
                username: user.username,
                password_hash: hashedPassword,
                email: user.email, 
                firstname: user.firstname,
                lastname: user.lastname
            }
        })
        return newUser
    }


}


module.exports = { 
    User
}

import express, { Request, Response } from 'express';
const {User} = require('../models/userModel')
const user = new User();

export const createUser = async(req: Request, res: Response) => { 
    try{ 
        await user.createUser(req.body);
        res.status(200).send('User was succesfully created')
    }catch(error){ 
        res.status(500).send('Error creating user / username already taken')
        console.error(error);

    }

    
}

export const userAuth = async(req: Request, res: Response) => { 
    const {username, password} = req?.body; 

        const token = await user.authorizeUser(username, password);
        if(!token){ 
             res.status(500).send('Wrong Username Or Password'); 

        }else { 
            res.status(200).json(token);
        }
      
        
}
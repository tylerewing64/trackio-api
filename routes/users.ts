import express, {Router} from 'express';
import {createUser} from '../controllers/user_controller'
const router = express.Router();

router.post('/user', createUser);


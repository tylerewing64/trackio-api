import express, {Router} from 'express';
import {createUser, userAuth} from '../controllers/user_controller'



const router = express.Router();

router.post('/user', createUser);
router.post('/user/auth', userAuth);

module.exports = router;

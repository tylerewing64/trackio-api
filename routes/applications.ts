import express, {Router} from 'express';
import {createApplicationController} from '../controllers/application_controller'
const router = express.Router();

router.post('/application', createApplicationController);



module.exports = router;

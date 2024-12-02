import express, {Router} from 'express';
import {getApplicationsByUserIDController, createApplicationController, deleteApplicationControllers, editApplicationControllers, filteredSearchControllers} from '../controllers/application_controller'
const router = express.Router();

router.post('/application', createApplicationController);
router.delete('/application', deleteApplicationControllers);
router.put('/application', editApplicationControllers);
router.get('/application', filteredSearchControllers)
router.get('/application/user', getApplicationsByUserIDController);


module.exports = router;

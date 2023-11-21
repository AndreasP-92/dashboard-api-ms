import { Router } from 'express';

import UserController from '../Controller/UserController.js';

const router = Router();

// ================== USER ROUTES ================== //
router.post('/create/user', UserController.createUser);
router.get('/get/user/:id', UserController.getUserById);
router.get('/get/user/email/:email', UserController.getUserByEmail);
router.delete('/delete/user/:id', UserController.deleteUserById);
router.get('/get/all/users', UserController.getAllUsers);

export default router;
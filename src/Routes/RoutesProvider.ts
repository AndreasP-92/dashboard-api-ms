import { Router } from 'express';

import UserController from '../Controller/UserController.js';
import LoginController from '../Controller/LoginController.js';

const router = Router();

/**
 * @swagger
 * /api/create/user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Firstname:
 *                 type: string
 *               Lastname:
 *                 type: string
 *               UserRoleId:
 *                  type: integer
 *               CompanyId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User created successfully
 */
router.post('/api/create/user', UserController.createUser);

/**
 * Retrieves a user by their ID.
 *
 * @swagger
 * /api/get/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: example@example.com
 *               firstname: John
 *               lastname: Doe
 */
router.get('/api/get/user/:id', UserController.getUserById);

/**
 * Get a user by their email.
 *
 * @swagger
 * /api/get/user/email/{email}:
 *   get:
 *     summary: Get a user by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found successfully
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: example@example.com
 *               firstname: John
 *               lastname: Doe
 */
router.get('/api/get/user/email/:email', UserController.getUserByEmail);

/**
 * Delete a user by their ID.
 *
 * @swagger
 * /api/delete/user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User deleted successfully
 */
router.delete('/api/delete/user/:id', UserController.deleteUserById);

/**
 * Get all users.
 *
 * @swagger
 * /api/get/all/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - id: 1
 *                   email: example1@example.com
 *                   firstname: John
 *                   lastname: Doe
 *                 - id: 2
 *                   email: example2@example.com
 *                   firstname: Jane
 *                   lastname: Smith
 */
router.get('/api/get/all/users', UserController.getAllUsers);

/**
 * Update a user by their ID.
 *
 * @swagger
 * /api/put/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               Firstname:
 *                 type: string
 *               Lastname:
 *                 type: string
 *               UserRoleId:
 *                  type: integer
 *               CompanyId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User updated successfully
 */
router.put('/api/put/user/:id', UserController.updateUser);

// === LOGIN ===
/**
 * Verify login credentials.
 *
 * @swagger
 * /api/get/login/verify:
 *   get:
 *     summary: Verify login credentials
 *     responses:
 *       '200':
 *         description: Login verified successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Login verified successfully
 */
router.post('/api/get/login/verify', LoginController.verify, LoginController.verifyedUser)
/**
 * Perform user login.
 *
 * @swagger
 * /api/post/login:
 *   post:
 *     summary: Perform user login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *               Password:
 *                 type: string
 *               key:
 *                type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Login successful
 */
router.post('/api/post/login', LoginController.login)

export default router;
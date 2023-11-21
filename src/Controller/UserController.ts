

import { Request, Response } from 'express';
import UserInterface from '../Models/Interface/UserInterface.js';
import UserRepository from '../Repositories/UserRepository.js';
import { ObjectToReturn } from 'Models/Types/ObjectToReturnModel.js';

class UserController {
    async createUser(req: Request, res: Response) {
        const { Email, Password, Firstname, Lastname } = req.body;

        const user: UserInterface = {
            Id: 0,
            Email,
            Password,
            Firstname,
            Lastname,
            IsActive: false,
        };

        const userRepository = new UserRepository();
        userRepository.setUser(user);

        const result:ObjectToReturn = await userRepository.createUser();

        return res.status(200).json(result);
    }

    async getUserById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        const userRepository = new UserRepository();

        const result:ObjectToReturn = await userRepository.getUserById(id);

        return res.status(200).json(result);
    }

    async getUserByEmail(req: Request, res: Response) {
        const { email } = req.params;

        const userRepository = new UserRepository();

        const result:ObjectToReturn = await userRepository.getUserByEmail(email);

        return res.status(200).json(result);
    }

    async getAllUsers(req: Request, res: Response) {
        const userRepository = new UserRepository();

        const users:ObjectToReturn = await userRepository.getAllUsers();

        return res.status(200).json(users);
    }

    async deleteUserById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        const userRepository = new UserRepository();

        const result:ObjectToReturn = await userRepository.deleteUserById(id);

        return res.status(200).json(result);
    }
}

export default new UserController();
import jwt, {JwtPayload} from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';
import UserRepository from '../Repositories/UserRepository.js';
import ValidatedUserToReturnModel from '../Models/Types/ValidatedUserToReturnModel.js';
import GenerateJwtToken from '../Services/GenerateJwtToken.js';
import { ObjectToReturn } from 'Models/Types/ObjectToReturnModel.js';
import UserInterface from '../Models/Interface/UserInterface.js';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

class UserController{

    constructor(){}

    verify (req: AuthenticatedRequest, res: Response, next: NextFunction) {
        let token: string | undefined | string[] = req.headers["x-access-token"];

        if (!token) {
            console.log(token);
            return res.status(403).json({ message: "No token provided", verified: false });
        }

        // If token is an array, take the first element
        if (Array.isArray(token)) {
            token = token[0];
        }

        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Unauthorized " + error, verified: false });
            }
            const jwtPayload = decoded as JwtPayload;
            req.userId = jwtPayload.id;
            next();
        });
    }

    async verifyedUser(req: Request, res: Response): Promise<void>  {
        const user = new UserRepository();
        const result = await user.getUserById(req.body.userId);
        
        // let isAdmin = result.object?.userRoles[0].role == 'admin' ? true : false;
    
        res.status(200).json({veryfied: true});
    }

    async login (req: Request, res: Response): Promise<void> {
        const body = req.body;

        const userRepository = new UserRepository();
        const foundUser:ObjectToReturn = await userRepository.getUserByEmail(body.email);
        const user:UserInterface = foundUser.object;
        
        const validated: ValidatedUserToReturnModel = await userRepository.validateUser(body.email, body.password);
    
        validated.Success && validated.ValidatedPassword ?
            res.status(202).json({userId: validated.UserId, validPassword: validated.ValidatedPassword, generatedToken: GenerateJwtToken.generate(validated.UserId, body), msg: validated?.msg, })
            :
            res.status(401).json({validPassword: validated.ValidatedPassword, msg: "Login error" + validated?.msg})
    
    }
}

export default new UserController();
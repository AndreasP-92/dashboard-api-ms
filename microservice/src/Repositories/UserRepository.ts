import bcrypt from 'bcrypt';

import UserModel from '../Models/DatabaseModels/UserModel.js';
import CompanyModel from '../Models/DatabaseModels/CompanyModel.js'
import UserRoleModel from '../Models/DatabaseModels/UserRoleModel.js';
import { ObjectToReturn } from '../Models/Types/ObjectToReturnModel.js';
import LogRepository from "./LogRepositroy.js";
import UserInterface from '../Models/Interface/UserInterface.js';
import ValidatedUserToReturnModel from '../Models/Types/ValidatedUserToReturnModel.js';

class UserRepository {
    Id: number;
    Email: string;
    Password: string;
    Firstname: string;
    Lastname: string;

    user: UserInterface;

    objectToReturn = new ObjectToReturn({}, true, "", 200);
    log = new LogRepository();

    constructor() {

    }

    setUser(user: UserInterface): void {
        this.Id = user.Id;
        this.Email = user.Email;
        this.Password = user.Password;
        this.Firstname = user.Firstname;
        this.Lastname = user.Lastname;
        this.user = user;
    }

    async createUser(): Promise<ObjectToReturn> {
        try {
            this.Password = await bcrypt.hash(this.Password, 10);
            this.user.Password = this.Password;
            const data = await UserModel.create(this.user);
            this.objectToReturn.object = data;

            this.log.shortMessage = "User created";
            this.log.fullMessage = "User created with Id: " + data.Id + " and email: " + data.Email;
            await this.log.insertLog();

            return this.objectToReturn;
        } catch (error) {
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to insert user" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not created";
            this.log.fullMessage = "User not created with email: " + this.Email;
            await this.log.insertLog();

            return this.objectToReturn;
        }

    }

    async getUserById(Id: number): Promise<ObjectToReturn> {
        try {
            const data = await UserModel.findByPk(Id, {
                include: [
                    { model: UserRoleModel },
                    { model: CompanyModel }
                ]
            });

            this.objectToReturn.object = data;

            return this.objectToReturn;
        } catch (error) {
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to get user by Id" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not found";
            this.log.fullMessage = "User not found with Id: " + Id;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    }

    async getUserByEmail(email: string): Promise<ObjectToReturn> {
        try {
            const data = await UserModel.findOne({
                where: { Email: email },
                include: [
                    { model: UserRoleModel },
                    { model: CompanyModel }
                ]
            });

            this.objectToReturn.object = data;

            return this.objectToReturn;
        } catch (error) {
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to get user by email" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not found";
            this.log.fullMessage = "User not found with email: " + email;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    }

    async updateUserById(): Promise<ObjectToReturn> {
        try {
            this.user.Password = await bcrypt.hash(this.Password, 10);
            const data = await UserModel.update(this.user,
                {
                    where: { Id: this.Id },
                }
            );

            this.objectToReturn.object = data;

            return this.objectToReturn;
        } catch (error) {
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to update user" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not updated";
            this.log.fullMessage = "User not updated with Id: " + this.Id;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    }

    async deleteUserById(Id: number): Promise<ObjectToReturn> {
        try {
            const data = await UserModel.destroy({ where: { Id: Id } });

            this.objectToReturn.object = data;

            return this.objectToReturn;
        } catch (error) {
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to delete user" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not deleted";
            this.log.fullMessage = "User not deleted with Id: " + Id;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    }

    async getAllUsers(): Promise<ObjectToReturn> {
        try {
            const data = await UserModel.findAll({
                include: [
                    { model: UserRoleModel },
                    { model: CompanyModel }
                ]
            });

            this.objectToReturn.object = data;

            return this.objectToReturn;
        } catch (error) {
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to get all users" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "Failed to get all users";
            this.log.fullMessage = "Failed to get all users: " + error;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    }

    async validateUser(email: string, password: string): Promise<ValidatedUserToReturnModel> {
        try {
            const data = await UserModel.findOne({
                where: { Email: email },
                include: [
                    { model: UserRoleModel },
                    { model: CompanyModel }
                ]
            });

            const valIdPassword = await bcrypt.compare(password, data.Password)

            return new ValidatedUserToReturnModel(data.Id, valIdPassword, true, data, "", 200)
        }
        catch (error) {
            return new ValidatedUserToReturnModel(0, false, false, {}, "OOPS, something went wrong valIdateUser" + error, 405)
        }
    }

    async getAllUsersSoft() {
        try {
            const data = await UserModel.findAll({
                paranoid: false,
                include: {
                    model: UserModel,
                    attributes: ['role']
                }
            });


            return {
                success: true,
                object: data
            }
        }
        catch (error) {
            return {
                success: false,
                object: {},
                msg: "OOPS, something went wrong in getAllUsers" + error,
                status: 405
            }
        }
    }

}
export default UserRepository;
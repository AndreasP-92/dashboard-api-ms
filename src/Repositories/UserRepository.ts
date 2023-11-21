import bcrypt from 'bcrypt';

import UserModel from '../Models/DatabaseModels/UserModel.js';
import { ObjectToReturn } from '../Models/Types/ObjectToReturnModel.js';
import LogRepository from "./LogRepositroy.js";
import UserInterface from '../Models/Interface/UserInterface.js';

class UserRepository{
    Id: number;
    Email: string;
    Password: string;
    Firstname: string;
    Lastname: string;

    user: UserInterface;

    objectToReturn = new ObjectToReturn({}, true, "", 200);
    log = new LogRepository();

    constructor(){

    }

    setUser(user: UserInterface){
        this.Id = user.Id;
        this.Email = user.Email;
        this.Password = user.Password;
        this.Firstname = user.Firstname;
        this.Lastname = user.Lastname;
    }

    async createUser(){    
        try{
            this.Password = await bcrypt.hash(this.Password, 10);
            const data = await UserModel.create(this.user);
            this.objectToReturn.object = data;

            this.log.shortMessage = "User created";
            this.log.fullMessage = "User created with Id: " + data.Id + " and email: " + data.Email;
            await this.log.insertLog();

            return this.objectToReturn;
        }catch(error){
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to insert user" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not created";
            this.log.fullMessage = "User not created with email: " + this.Email;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    
    }

    async getUserById(Id: number){
        try{
            const data = await UserModel.findByPk(this.Id);

            this.objectToReturn.object = data;

            return this.objectToReturn;
        }catch(error){
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to get user by Id" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not found";
            this.log.fullMessage = "User not found with Id: " + this.Id;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    }

    async getUserByEmail(email: string) {
        try {
            const data = await UserModel.findOne({ where: { Email: email } });

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

    async updateUserById(){
        try{
            const data = await UserModel.update(this, {where: {Id: this.Id}});

            this.objectToReturn.object = data;

            return this.objectToReturn;
        }catch(error){
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to update user" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not updated";
            this.log.fullMessage = "User not updated with Id: " + this.Id;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    }

    async deleteUserById(Id: number){
        try{
            const data = await UserModel.destroy({where: {Id: Id}});

            this.objectToReturn.object = data;

            return this.objectToReturn;
        }catch(error){
            this.objectToReturn.success = false;
            this.objectToReturn.errorMsg = "OOPS, something went wrong while trying to delete user" + error;
            this.objectToReturn.status = 405;

            this.log.shortMessage = "User not deleted";
            this.log.fullMessage = "User not deleted with Id: " + Id;
            await this.log.insertLog();

            return this.objectToReturn;
        }
    }

    async getAllUsers() {
        try {
            const data = await UserModel.findAll();

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

    async valIdateUser (user: UserInterface) {
        try {
            const data = await UserModel.findOne({where: { Email: user.Email}});

            const valIdPassword = await bcrypt.compare(user.Password, data.Password)
            console.log(data.Id)
            return {
                userId : data.Id,
                valIdPassword: valIdPassword,
                success: true,
                object: data,
                msg: ""
            }
        }
        catch (error) {
            return {
                success: false,
                Object: {},
                msg: "OOPS, something went wrong valIdateUser" + error,
                status: 405
            }
        }
    }
}
export default UserRepository;
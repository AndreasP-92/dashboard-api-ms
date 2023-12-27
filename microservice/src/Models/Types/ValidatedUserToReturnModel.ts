

class ValidatedUserToReturnModel {
    UserId: number;
    ValidatedPassword: boolean;
    Success: boolean;
    Object: any;
    msg: string;
    status: number;

    constructor(userId: number, validatedPassword: boolean, success: boolean, obj: any, msg: string, status: number) {
        this.UserId = userId;
        this.ValidatedPassword = validatedPassword;
        this.Success = success;
        this.Object = obj;
        this.msg = msg;
        this.status = status;
    }

    getAttributes(): any {
        return {
            UserId: this.UserId,
            ValidatedPassword: this.ValidatedPassword,
            Success: this.Success,
            Object: this.Object,
            msg: this.msg,
            status: this.status
        };
    }
}

export default ValidatedUserToReturnModel;
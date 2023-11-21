export class ObjectToReturn {
    object: any
    success: boolean;
    errorMsg: string;
    status: number;

    constructor(object: any, success: boolean, errorMsg: string, status: number) {
        this.object = object;
        this.success = success;
        this.errorMsg = errorMsg;
        this.status = status;
    }

    getAttributes() {
        return {
            object: this.object,
            success: this.success,
            errorMsg: this.errorMsg,
            status: this.status
        };
    }
}
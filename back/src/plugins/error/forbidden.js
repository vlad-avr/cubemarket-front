import { CustomError } from "./custom-error.js";

export class Forbidden extends CustomError {
    constructor(){
        super("Not Authorized", 403)
    }
}
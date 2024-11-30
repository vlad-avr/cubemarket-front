import { CustomError } from "./custom-error.js";

export class BadRequest extends CustomError {
    constructor(message){
        super(message, 400)
    }
}
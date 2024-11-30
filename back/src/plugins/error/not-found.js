import { CustomError } from "./custom-error.js";

export class NotFoundError extends CustomError {
    constructor(){
        super("Entety not found", 404)
    }
}
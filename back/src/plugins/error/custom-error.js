export class CustomError extends Error {
    statusCode

    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }

    static parse(error){
        return new CustomError(error.message, 500)
    }
}
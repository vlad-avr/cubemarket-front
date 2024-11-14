import { CustomError } from "./custom-error.js";

export const errorHandler = (error, req, rep) => {
    if(error instanceof CustomError){
        rep.code(error.statusCode).send({
            message: error.message,
            ...error
        })
    }

    const serverError = CustomError.parse(error)
    rep.code(serverError.statusCode).send({
        message: 'Server side error occured',
        statusCode: serverError.statusCode
    })
}
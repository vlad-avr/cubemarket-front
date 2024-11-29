import { getUser, login, register } from "./logic.js"
import { Get, Login, Register } from "./schema.js"

export const UserController = (server, opts, done) => {
    server.put('/', (req, rep) => {
        
    })

    done()
}
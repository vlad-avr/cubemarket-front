import { putUser } from "./logic.js"
import { Put } from "./schema.js"

export const UserController = (server, opts, done) => {
    server.put('/', { schema: Put }, async (req, rep) => {
        await putUser(req.user, req.body)
    })

    done()
}
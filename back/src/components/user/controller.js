import { AddTagPlugin } from "../../plugins/add-tag.js"
import { getUser, login, register } from "./logic.js"
import { Get, Login, Register } from "./schema.js"

export const UserController = (server, opts, done) => {
    server.addHook('onRoute', AddTagPlugin('Users'))

    server.get('/:id', { schema: Get }, async (req, rep) => {
        return await getUser(req.params.id)
    })

    server.post('/register', { schema: Register }, async (req, rep) => {
        const res = await register(req.body)
        return {
            id: res
        }
    })

    server.post('/login', { schema: Login }, async (req, rep) => {
        return await login(req.body)
    })

    server.put('/', (req, rep) => {
        
    })

    done()
}
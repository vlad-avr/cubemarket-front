import { getUser, login, register } from "../logic.js"
import { FuckedLogin, Get, Login, Register } from "../schema.js"


export const PublicUserController = (server, opts, done) => {
    server.get('/:id', { schema: Get }, async (req, rep) => {
        return await getUser(req.params.id)
    })

    server.post('/register', { schema: FuckedLogin }, async (req, rep) => {
        // const res = await register(req.body)
        // return {
        //     id: res
        // }
        return await register(req.body)
    })

    server.post('/login', { schema: FuckedLogin }, async (req, rep) => {
        return await login(req.body)
    })

    done()
}
import { AddTagPlugin } from "../../plugins/add-tag.js"
import { register } from "./logic.js"

export const UserController = (server, opts, done) => {
    server.addHook('onRoute', AddTagPlugin('Users'))

    server.get('/', {}, (req, rep) => {
        return {user: 'user1'}
    })

    server.post('/register', {}, async (req, rep) => {
        const res = await register(req.body)
        return res
    })

    server.put('/', (req, rep) => {
        
    })

    done()
}
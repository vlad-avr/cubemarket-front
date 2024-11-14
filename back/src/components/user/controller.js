import { register } from "./logic"

export const UserController = (server, opts, done) => {
    server.get('/', (req, rep) => {
        return {user: 'user1'}
    })

    server.post('/register', async (req, rep) => {
        const res = await register(req.body)
        return res
    })

    server.put('/', (req, rep) => {
        
    })

    done()
}
export const UserController = (server, opts, done) => {
    server.get('/', (req, rep) => {
        return {user: 'user1'}
    })

    server.post('/', (req, rep) => {
        
    })

    server.put('/', (req, rep) => {
        
    })

    done()
}
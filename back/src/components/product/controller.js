export const ProductController = (server, opts, done) => {
    server.get('/', (req, rep) => {
        return {msg: 'hit products'}
    })

    done()
}
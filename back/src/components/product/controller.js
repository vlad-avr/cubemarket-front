import { getProduct } from "./logic.js" 

export const ProductController = (server, opts, done) => {
    server.get('/:id', async (req, rep) => {
        return await getProduct(req.params.id)
    })

    done()
}
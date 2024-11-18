import { getProduct, postProduct } from "./logic.js" 
import { PostProduct } from "./schema.js"

export const ProductController = (server, opts, done) => {
    server.get('/:id', async (req, rep) => {
        return await getProduct(req.params.id)
    })

    server.post('/', {schema: PostProduct}, async (req, rep) => {
        return await postProduct(req.user, req.body)
    })

    done()
}
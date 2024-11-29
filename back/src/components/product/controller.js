import { getProduct, getProductList, postProduct, updateProduct } from "./logic.js" 
import { PostProduct, ProductList, UpdateProduct } from "./schema.js"

export const ProductController = (server, opts, done) => {
    server.get('/:id', async (req, rep) => {
        return await getProduct(req.params.id)
    })

    server.post('/', {schema: PostProduct}, async (req, rep) => {
        return await postProduct(req.user, req.body)
    })

    server.post('/buy', {}, async (req, rep) => {})

    server.put('/', { schema: UpdateProduct }, async (req, res) => {
        return await updateProduct(req.user, req.body)
    })

    done()
}
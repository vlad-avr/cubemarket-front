import { getProductList } from "../logic.js"
import { ProductList } from "../schema.js"

export const PublicProductController = (server, opts, done) => {
     server.get('/list', { schema: ProductList }, async (req, rep) => {
        return await getProductList(req.query)
    })

    done()
}
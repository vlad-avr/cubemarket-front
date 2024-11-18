import { AddTagPlugin } from "../../plugins/add-tag.js"
import { Auth } from "../../plugins/auth.js"

export const ProductController = (server, opts, done) => {
    server.addHook('onRoute', AddTagPlugin('Products'))
    server.register(Auth)

    server.get('/', (req, rep) => {
        return {msg: 'hit products'}
    })

    done()
}
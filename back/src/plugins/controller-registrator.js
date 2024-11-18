import { ProductRegistrator } from "../components/product/registrator.js"
import { UserRegistrator } from "../components/user/registrator.js"

export const ControllerRegistrator = (server, opts, done) => {
    server.register(UserRegistrator, { prefix: '/user' })
    server.register(ProductRegistrator, { prefix: '/product' })

    done()
}
import { ProductController } from "../components/product/controller.js"
import { UserController } from "../components/user/controller.js"

export const ControllerRegistrator = (server, opts, done) => {
    server.register(UserController, { prefix: '/user' })
    server.register(ProductController, { prefix: '/product' })

    done()
}
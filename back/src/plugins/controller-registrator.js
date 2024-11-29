import { PublicProductRegistrator } from "../components/product/public/registrator.js"
import { ProductRegistrator } from "../components/product/registrator.js"
import { TransactionRegistrator } from "../components/transaction/registrator.js"
import { UserRegistrator } from "../components/user/registrator.js"

export const ControllerRegistrator = (server, opts, done) => {
    server.register(UserRegistrator, { prefix: '/user' })
    server.register(ProductRegistrator, { prefix: '/product' })
    server.register(PublicProductRegistrator, { prefix: '/product' })
    server.register(TransactionRegistrator, { prefix: '/transaction'})

    done()
}
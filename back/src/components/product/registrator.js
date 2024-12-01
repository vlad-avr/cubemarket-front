import { AddTagPlugin } from "../../plugins/add-tag.js"
import { Auth } from "../../plugins/auth.js"
import { Role } from "../../plugins/role.js"
import { ProductController } from "./controller.js"

export const ProductRegistrator = (server, opts, done) => {
    server.register(AddTagPlugin, { tag: 'Products' })
    server.register(Auth)
    server.register(Role, { roles: ['admin'] })

    server.register(ProductController)

    done()
}
import { AddTagPlugin } from "../../plugins/add-tag.js"
import { Auth } from "../../plugins/auth.js"
import { ProductController } from "./controller.js"

export const ProductRegistrator = async (server, opts) => {
    await server.register(AddTagPlugin, { tag: 'Products' })
    await server.register(Auth)

    await server.register(ProductController)
}
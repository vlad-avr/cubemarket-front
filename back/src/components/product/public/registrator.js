import { AddTagPlugin } from "../../../plugins/add-tag.js"
import { PublicProductController } from "./controller.js"

export const PublicProductRegistrator = (server, opts, done) => {
    server.register(AddTagPlugin, { tag: 'Products' })

    server.register(PublicProductController)

    done()
}
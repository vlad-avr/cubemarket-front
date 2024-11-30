import { AddTagPlugin } from "../../../plugins/add-tag.js"
import { PublicUserController } from "./controller.js"

export const PublicUserRegistrator = (server, opts, done) => {
    server.register(AddTagPlugin, { tag: 'Users' })
    server.register(PublicUserController)

    done()
}
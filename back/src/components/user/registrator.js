import { AddTagPlugin } from "../../plugins/add-tag.js"
import { UserController } from "./controller.js"

export const UserRegistrator = (server, opts, done) => {
    server.register(AddTagPlugin, { tag: 'Users' })
    server.register(UserController)

    done()
}
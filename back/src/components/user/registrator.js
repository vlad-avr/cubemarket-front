import { AddTagPlugin } from "../../plugins/add-tag.js"
import { UserController } from "./controller.js"
import { Auth } from "../../plugins/auth.js"

export const UserRegistrator = (server, opts, done) => {
    server.register(Auth)
    server.register(AddTagPlugin, { tag: 'Users' })
    server.register(UserController)

    done()
}
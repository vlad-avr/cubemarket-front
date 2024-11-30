import { AddTagPlugin } from "../../plugins/add-tag.js"
import { Auth } from "../../plugins/auth.js"
import { TransactionController } from "./controller.js"

export const TransactionRegistrator = (server, opts, done) => {
    server.register(AddTagPlugin, { tag: 'Transaction' })
    server.register(Auth)

    server.register(TransactionController)

    done()
}
import { UserController } from "../components/user/controller.js"

export const ControllerRegistrator = (server, opts, done) => {
    server.register(UserController, { prefix: '/user' })

    done()
}
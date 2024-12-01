import { AddTagPlugin } from "../../plugins/add-tag.js"
import { Auth } from "../../plugins/auth.js"
import { Role } from "../../plugins/role.js"
import { AdminController } from "./controller.js"

export const AdminRegistrator = async (server, opts) => {
    await server.register(AddTagPlugin, { tag: 'Admin' })
    await server.register(Auth)
    await server.register(Role, { roles: ['admin', 'superadmin'] })

    await server.register(AdminController)
}
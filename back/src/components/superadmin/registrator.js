import { AddTagPlugin } from "../../plugins/add-tag.js"
import { Auth } from "../../plugins/auth.js"
import { Role } from "../../plugins/role.js"
import { SuperAdminController } from "./controller.js"

export const SuperAdminRegistrator = async (server, opts) => {
    await server.register(AddTagPlugin, { tag: 'Super Admin' })
    await server.register(Auth)
    await server.register(Role, { roles: ['superadmin'] })

    await server.register(SuperAdminController)
}
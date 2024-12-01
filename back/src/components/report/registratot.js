import { AddTagPlugin } from "../../plugins/add-tag.js"
import { Auth } from "../../plugins/auth.js"
import { Role } from "../../plugins/role.js"
import { ReportController } from "./controller.js"

export const ReportRegistrator = async (server, opts) => {
    await server.register(AddTagPlugin, { tag: 'Report' })
    await server.register(Auth)

    await server.register(ReportController)
}
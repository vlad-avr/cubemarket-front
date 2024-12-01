import { BadRequest } from "../../plugins/error/bad-request.js"
import { getUser, putUser } from "../user/logic.js"
import { SetRole } from "./schema.js"

export const SuperAdminController = (server, opts, done) => {
    server.put('/set-role', { schema:  SetRole}, async (req, rep) => {
        const user = await getUser(req.body.user)
        if(user.role === 'superadmin'){
            throw new BadRequest("Can't change role of other superadmin")
        }
        await putUser(user, {
            role: req.body.role
        })
    })
    done()
}
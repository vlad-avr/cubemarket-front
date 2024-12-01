import { setBlockUser } from "./logic.js" 
import { SetBlockUser } from "./schema.js"

export const AdminController = (server, opts, done) => {
    server.put('/set-block', { schema: SetBlockUser }, async (req, rep) => {
        await setBlockUser(req.body)
    })
    done()
}
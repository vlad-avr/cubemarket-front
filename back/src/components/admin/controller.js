import { listReport } from "../report/logic.js"
import { ListReport } from "../report/schema.js"
import { getUserList } from "../user/logic.js"
import { UserList } from "../user/schema.js"
import { setBlockUser } from "./logic.js" 
import { SetBlockUser } from "./schema.js"

export const AdminController = (server, opts, done) => {
    server.put('/set-block', { schema: SetBlockUser }, async (req, rep) => {
        await setBlockUser(req.body)
    })

    server.get('/report-list', { schema: ListReport }, async (req, rep) => {
        return await listReport(req.query)
    })

    server.get('/user-list', { schema: UserList }, async (req, res) => {
        return await getUserList(req.query)
    })
    
    done()  
}
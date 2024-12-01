import { postReport } from "./logic.js"
import { PostReport } from "./schema.js"


export const ReportController = (server, opts, done) => {
    server.post('/', { schema: PostReport }, async (req, rep) => {
        await postReport(req.user, req.body)
    })
    done()
}
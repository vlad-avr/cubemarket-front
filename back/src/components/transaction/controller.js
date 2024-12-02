import { getTransactionList } from "./logic.js"
import { GetList } from "./schema.js"

export const TransactionController = (server, opts, done) => {
    server.get('/list', { schema: GetList }, async (req, rep) => {
        return await getTransactionList(req.query)
    })

    done()
}
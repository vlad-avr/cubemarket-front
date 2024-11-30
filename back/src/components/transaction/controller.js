import { GetList } from "./schema.js"

export const TransactionController = (server, opts, done) => {
    server.get('/list', { schema: GetList }, async (req, rep) => {})

    done()
}
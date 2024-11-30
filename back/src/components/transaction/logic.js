import { v4 } from 'uuid'
import { db } from '../../db/index.js'
import { transactionTable } from '../../db/schema.js'
import { asc } from 'drizzle-orm'

export const postTransaction = async (body) => {
    const id = v4()
    await db
        .insert(transactionTable)
        .values({
            id,
            ...body,
        })
    return {
        id
    }
}

export const getTransactionList = async (body) => {
    const list = await db.
    select()
    .from(transactionTable)
    .orderBy(asc(transactionTable.date))
    .limit(body.limit)
    .offset(body.offset)
}
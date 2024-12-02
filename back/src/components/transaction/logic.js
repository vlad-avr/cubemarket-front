import { v4 } from 'uuid'
import { db } from '../../db/index.js'
import { transactionTable } from '../../db/schema.js'
import { and, asc, eq } from 'drizzle-orm'

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
    .where(
        and(
            body.lowDate ? gte(transactionTable.price, body.lowDate) : undefined,
            body.highDate ? lte(transactionTable.price, body.highDate) : undefined,
            body.product ? eq(transactionTable.product, body.product) : undefined,
            body.buyer ? eq(transactionTable.buyer, body.buyer) : undefined
        )
    )
    .orderBy(asc(transactionTable.date))
    .limit(body.limit)
    .offset(body.offset)

    return list
}
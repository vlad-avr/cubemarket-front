import { v4 } from 'uuid'
import { db } from '../../db/index.js'
import { transactionTable } from '../../db/schema.js'
import { and, asc } from 'drizzle-orm'

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
            body.highDate ? lte(transactionTable.price, body.highDate) : undefined
        )
    )
    .orderBy(asc(transactionTable.date))
    .limit(body.limit)
    .offset(body.offset)

    return list
}
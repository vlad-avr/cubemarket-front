import { v4 } from 'uuid'
import { reportTable } from '../../db/schema.js'
import { db } from '../../db/index.js'
import { and, desc } from 'drizzle-orm'

export const postReport = async (user, body) => {
    const id = v4()
    await db
    .insert(reportTable)
    .values({
        id,
        content: body.content,
        date: new Date().getTime(),
        reporter: user.id,
        reported: body.reported,
        reviewed: false
    })
}

export const listReport = async (body) => {
    const list = await db
        .select()
        .from(reportTable)
        .where(
            and(
                body.lowDate ? gte(reportTable.price, body.lowDate) : undefined,
                body.highDate ? lte(reportTable.price, body.highDate) : undefined
            )
        )
        .orderBy(desc(reportTable.date))
        .limit(body.limit)
        .offset(body.offset)
    return list
}
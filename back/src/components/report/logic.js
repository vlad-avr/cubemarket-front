import { v4 } from 'uuid'
import { reportTable } from '../../db/schema.js'
import { db } from '../../db/index.js'

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
    })
}
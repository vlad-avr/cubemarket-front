import { eq } from "drizzle-orm"
import { db } from "../../db/index.js"
import { usersTable } from "../../db/schema.js"

export const setBlockUser = async (body) => {

    await db
        .update(usersTable)
        .set({
            blocked: body.blocked
        })
        .where(eq(usersTable.id, body.user))
}
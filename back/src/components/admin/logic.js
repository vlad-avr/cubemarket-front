import { eq } from "drizzle-orm"
import { db } from "../../db/index.js"
import { usersTable } from "../../db/schema.js"
import { getUser } from "../user/logic.js"
import { BadRequest } from "../../plugins/error/bad-request.js"

export const setBlockUser = async (body) => {
    const blockedUser = await getUser(body.user)
    if(['admin', 'superadmin'].includes(blockedUser.role)){
        throw new BadRequest("Can't block other admin")
    }
    await db
        .update(usersTable)
        .set({
            blocked: body.blocked
        })
        .where(eq(usersTable.id, body.user))
}
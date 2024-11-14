import { db } from "../../db"
import { usersTable } from "../../db/schema"
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

export const  register = async (body) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)
    const id = v4()
    await db.insert(usersTable).values({
        email: body.email,
        name: body.name,
        id,
        password,
    })
    return id
}
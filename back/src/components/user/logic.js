import { db } from "../../db/index.js"
import { usersTable } from "../../db/schema.js"
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { eq } from "drizzle-orm"
import jwt from 'jsonwebtoken'
import 'dotenv/config';

export const getUser = async (id) => {
    const user = await db.select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name
    }).from(usersTable).where(eq(usersTable.id, id))
    return user[0]
}

export const getUserByEmail = async (email) => {
    const user = await db.select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name
    }).from(usersTable).where(eq(usersTable.email, email))
    return user[0]
}

export const getHashedPassword = async (id) => {
    const user = await db.select({
        password: usersTable.password,
    }).from(usersTable).where(eq(usersTable.id, id))
    return user[0].password
}

export const  register = async (body) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(body.password, salt)
    const id = v4()
    await db.insert(usersTable).values({
        email: body.email,
        name: body.name,
        id,
        password,
    })
    return id
}

export const login = async (body) => {
    const user = await getUserByEmail(body.email)
    const hashedPswd = await getHashedPassword(user.id)
    const verified = await bcrypt.compare(body.password, hashedPswd)
    if(!verified){
        return {
            mes: 'ni'
        }
    }
    const token = jwt.sign(user, process.env.SECRET_KEY)
    return { token }
}
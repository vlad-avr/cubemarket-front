import { db } from "../../db/index.js"
import { usersTable } from "../../db/schema.js"
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import { and, asc, eq, ilike, sql } from "drizzle-orm"
import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { NotFoundError } from "../../plugins/error/not-found.js"
import { CustomError } from "../../plugins/error/custom-error.js"

export const getUser = async (id) => {
    const user = (await db.select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        balance: usersTable.balance,
        role: usersTable.role,
        blocked: usersTable.blocked,
    }).from(usersTable).where(eq(usersTable.id, id)))[0]
    if (!user) {
        throw new NotFoundError()
    }
    return user
}

export const getUserByEmail = async (email) => {
    const user = (await db.select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        balance: usersTable.balance,
        role: usersTable.role,
        blocked: usersTable.blocked,
    }).from(usersTable).where(eq(usersTable.email, email)))[0]
    if (!user){
        throw new NotFoundError()
    }
    return user
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
        balance: 0,
        role: 'client',
        blocked: false,
    })
    const user = (await db.select({
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        balance: usersTable.balance,
        role: usersTable.role,
        blocked: usersTable.blocked,
    }).from(usersTable).where(eq(usersTable.id, id)))[0]
    if (!user){
        throw new NotFoundError()
    }
    const token = jwt.sign(user, process.env.SECRET_KEY)
    return { token }
}

export const login = async (body) => {
    const user = await getUserByEmail(body.email)
    const hashedPswd = await getHashedPassword(user.id)
    const verified = await bcrypt.compare(body.password, hashedPswd)
    if(!verified){
        throw new NotFoundError()
    }
    if(user.blocked){
        throw new CustomError('User blocked', 403)
    }
    const token = jwt.sign(user, process.env.SECRET_KEY)
    return { token }
}

export const putUser = async (user, body) => {
    await db
    .update(usersTable)
    .set({
        name: body.name,
        balance: body.balance ? sql`(select (${usersTable.balance} + ${body.balance}) as balance from ${usersTable} where ${usersTable.id} = ${user.id})` : body.balance,
        role: body.role,
    })
    .where(eq(usersTable.id, user.id))
}

export const getUserList = async (body) => {
    const list = await db.
    select()
    .from(usersTable)
    .where(
        and(
            body.name ? ilike(usersTable.name, `%${body.name}%`) : undefined,
            typeof body.blocked === 'boolean'   ? eq(usersTable.blocked, body.blocked) : undefined,
            body.role ? eq(usersTable.role, body.role) : undefined,
            body.email ? ilike(usersTable.email, `%${body.email}%`) : undefined,
        )
    )
    .orderBy(asc(usersTable.name))
    .limit(body.limit)
    .offset(body.offset)

    return list
}

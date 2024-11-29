import { and, asc, eq, gte, ilike, lte } from "drizzle-orm"
import { db } from "../../db/index.js"
import { productTable } from "../../db/schema.js"
import { NotFoundError } from "../../plugins/error/not-found.js"
import { v4 } from 'uuid'

export const getProduct = async (id) => {
    const product = (await db.select().from(productTable).where(eq(productTable.id, id)))[0]
    if (!product) {
        throw new NotFoundError()
    }
    return product
}

export const getProductList = async (query) => {
    const product = await db.
    select()
    .from(productTable)
    .where(
        and(
            query.name ? ilike(productTable.name, `%${query.name}%`) : undefined,
            query.user ? eq(productTable.userId, query.user) : undefined,
            query.lowPrice ? gte(productTable.price, query.lowPrice) : undefined,
            query.highPrice ? lte(productTable.price, query.highPrice) : undefined
        )
    )
    .orderBy(asc(productTable.leftover))
    .limit(query.limit)
    .offset(query.offset)

    return product
}

export const postProduct = async (user, body) => {
    const id = v4()
    await db.insert(productTable).values({
        id,
        leftover: 0,
        name: body.name,
        description: body.description,
        picture: body.picture,
        userId: user.id
    })

    return {id}
}

export const updateProduct = async (user, body) => {
    await db.update(productTable).set({
        leftover: body.leftover,
        name: body.name,
        description: body.description,
        picture: body.picture,
    }).where(and(eq(productTable.id, body.id), eq(productTable.userId, user.id)))
}
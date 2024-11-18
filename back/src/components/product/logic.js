import { eq } from "drizzle-orm"
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
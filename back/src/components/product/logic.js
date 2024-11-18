import { eq } from "drizzle-orm"
import { db } from "../../db/index.js"
import { productTable } from "../../db/schema.js"
import { NotFoundError } from "../../plugins/error/not-found.js"

export const getProduct = async (id) => {
    const product = (await db.select().from(productTable).where(eq(productTable.id, id)))[0]
    if (!product) {
        throw new NotFoundError()
    }
    return product
}
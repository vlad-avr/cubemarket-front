import { and, asc, eq, gte, ilike, lte, ne, sql } from "drizzle-orm"
import { db } from "../../db/index.js"
import { productTable } from "../../db/schema.js"
import { NotFoundError } from "../../plugins/error/not-found.js"
import { v4 } from 'uuid'
import { BadRequest } from "../../plugins/error/bad-request.js"
import { getUser, putUser } from "../user/logic.js"
import { postTransaction } from "../transaction/logic.js"

export const getProduct = async (id) => {
    const product = (await db.select().from(productTable).where(eq(productTable.id, id)))[0]
    if (!product) {
        throw new NotFoundError()
    }
    if(product.delete){
        throw new BadRequest("Product was deleted")
    }
    return product
}

// need list of products without own products
export const getProductList = async (query) => {
    const product = await db.
    select()
    .from(productTable)
    .where(
        and(
            eq(productTable.delete, query.delete),
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
        userId: user.id,
        price: body.price,
        delete: false
    })

    return {id}
}

export const updateProduct = async (user, body) => {
    await db.update(productTable).set({
        leftover: body.leftover ? sql`(select (${productTable.leftover} + ${body.leftover}) as leftover from ${productTable} where ${productTable.id} = ${body.id})` : body.leftover,
        name: body.name,
        description: body.description,
        picture: body.picture,
        delete: body.delete,
    }).where(and(eq(productTable.id, body.id), eq(productTable.userId, user.id)))
}

export const deleteProduct = async (user, body) => {
    await db.update(productTable).set({
        leftover: body.leftover ? sql`(select (${productTable.leftover} + ${body.leftover}) as leftover from ${productTable} where ${productTable.id} = ${body.id})` : body.leftover,
        name: body.name,
        description: body.description,
        picture: body.picture,
        delete: body.delete,
    }).where(and(eq(productTable.id, body.id), eq(productTable.userId, user.id)))
}

export const buyProduct = async (user, body) => {
    const purchasedProduct = await getProduct(body.product)
    const seller = await getUser(purchasedProduct.userId)
    const buyer = await getUser(user.id)
    const amount_payed = body.amount_sold*purchasedProduct.price
    if(user.id === purchasedProduct.userId){
        throw new BadRequest("Can't buy own product")
    }
    if(purchasedProduct.leftover < body.amount_sold){
        throw new BadRequest("Not enough product")
    }
    if(buyer.balance < amount_payed){
        throw new BadRequest("Not enough money")
    }
    await updateProduct(seller, {
        id: purchasedProduct.id,
        leftover: (-1)*body.amount_sold
    })
    await putUser(buyer, {
        balance: (-1)*amount_payed 
    })
    await postTransaction({
        ...body,
        amount_payed,
        buyer: user.id,
        date: new Date().getTime(),
    })
}
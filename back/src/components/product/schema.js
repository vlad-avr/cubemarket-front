import { Type } from "@fastify/type-provider-typebox";

export const Product = Type.Object({
    id: Type.String(),
    name: Type.String(),
    leftover: Type.Integer(),
    description: Type.Optional(Type.String()),
    picture: Type.Optional(Type.String()),
    userId: Type.String(),
    price: Type.Integer(),
})

export const ProductList = {
    querystring: Type.Object({
        limit: Type.Number(),
        offset: Type.Number(),
        name: Type.Optional(Type.String()),
        lowPrice: Type.Optional(Type.Number()),
        highPrice: Type.Optional(Type.Number()),
        user: Type.Optional(Type.String()),
    }),
    response: {
        200: Type.Array(Product)
    }
}

export const PostProduct = {
    body: Type.Omit(Product, ['id', 'userId', 'leftover']),
    response: {
        200: Type.Object({
            id: Type.String()
        })
    }
}

export const UpdateProduct = {
    body: Type.Composite([
        Type.Pick(Product, ['id']),
        Type.Partial(Type.Pick(Product, ['name', 'description', 'price']))
    ])
}
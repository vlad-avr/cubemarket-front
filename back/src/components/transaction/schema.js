import { Type } from "@fastify/type-provider-typebox";

export const Transaction = Type.Object({
    id: Type.String(),
    amount_sold: Type.Number(),
    amount_payed: Type.Number(),
    date: Type.Number(),
    product: Type.String(),
    buyer: Type.String()
})

export const GetList = {
    querystring: Type.Composite([
        Type.Object({
            limit: Type.Number(),
            offset: Type.Number(),
            lowDate: Type.Optional(Type.Number()),
            highDate: Type.Optional(Type.Number()),
        }),
        Type.Partial(Type.Pick(Transaction, [
            'product',
            'buyer'
        ]))
    ]),
    response: {
        200: Type.Array(Transaction)
    }
}
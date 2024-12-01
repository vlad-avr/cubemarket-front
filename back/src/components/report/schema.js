import { Type } from "@fastify/type-provider-typebox";

export const Report = Type.Object({
    date: Type.Number(),
    id: Type.String(),
    content: Type.String(),
    reporter: Type.String(),
    reported: Type.String(),
    reviewed: Type.Boolean(),
})

export const PostReport = {
    body: Type.Pick(Report, [
        'content',
        'reported'
    ])
}

export const ListReport = {
    querystring: Type.Object({
        limit: Type.Number(),
        offset: Type.Number(),
        lowDate: Type.Optional(Type.Number()),
        highDate: Type.Optional(Type.Number()),
    }),
    response: {
        200: Type.Array(Report)
    }
}
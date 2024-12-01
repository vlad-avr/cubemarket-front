import { Type } from "@fastify/type-provider-typebox";

export const Report = Type.Object({
    date: Type.Number(),
    id: Type.String(),
    content: Type.String(),
    reporter: Type.String(),
    reported: Type.String()
})

export const PostReport = {
    body: Type.Pick(Report, [
        'content',
        'reported'
    ])
}
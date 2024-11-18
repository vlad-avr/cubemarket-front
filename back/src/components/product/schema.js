import { Type } from "@fastify/type-provider-typebox";

export const Product = Type.Object({
    id: Type.String(),
    name: Type.String(),
    leftover: Type.Integer(),
    description: Type.Optional(Type.String()),
    picture: Type.Optional(Type.String()),
    userId: Type.String(),
})
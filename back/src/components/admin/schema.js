import { Type } from "@fastify/type-provider-typebox";

export const SetBlockUser = {
    body: Type.Object({
        user: Type.String(),
        blocked: Type.Boolean(),
    })
}
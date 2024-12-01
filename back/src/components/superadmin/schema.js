import { Type } from "@fastify/type-provider-typebox";
import { UserRole } from "../user/schema.js";

export const SetRole = {
    body: Type.Object({
        user: Type.String(),
        role: Type.Union(UserRole.filter(r => r !== 'superadmin').map(r => Type.Literal(r)))
    })
}
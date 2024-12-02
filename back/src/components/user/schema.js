import { Type } from '@fastify/type-provider-typebox'

export const UserRole = ['client', 'admin', 'superadmin']

export const User = Type.Object({
    email: Type.String(),
    name: Type.String(),
    id: Type.String(),
    balance: Type.Number(),
    role: Type.Union(UserRole.map(r => Type.Literal(r))),
    blocked: Type.Boolean()
})

export const Register = {
    body: Type.Object({
        password: Type.String(),
        name: Type.String(),
        email: Type.String()
    }),
    response: {
        200: Type.Object({
            id: Type.String()
        })
    }
}

export const Login = {
    body: Type.Object({
        password: Type.String(),
        email: Type.String()
    }),
    response: {
        200: Type.Object({
            token: Type.String()
        })
    }
}

export const Get = {
    params: Type.Object({
        id: Type.String()
    }),
    response: {
        200: User
    }
}

export const Put = {
    body: Type.Partial(Type.Omit(User, [
        'id',
        'email',
        'role',
        'blocked'
    ]))
}
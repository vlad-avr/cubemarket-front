import { Type } from '@fastify/type-provider-typebox'

export const User = Type.Object({
    email: Type.String(),
    name: Type.String(),
    id: Type.String(),
})

export const Register = {
    body: Type.Composite([Type.Object({
        password: Type.String(),
    })], Type.Omit(User, ['id'])),
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
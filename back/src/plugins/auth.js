import { Type } from "@fastify/type-provider-typebox";
import fastifyPlugin from "fastify-plugin";

export const Auth = fastifyPlugin.default((server, opts, done) => {
    server.addHook('onRequest', (request, reply, done) => {
        const jwt = request.headers.authorization
        console.log(jwt)

        done()
    })

    server.addHook('onRoute', (route, done) => {
        if (route.method === 'HEAD') {
            return
        }

        route.schema ??= {}

        if (route.schema.headers === undefined) {
            route.schema.headers = Type.Object({ authorization: Type.String() })
        } else {
            route.schema.headers = Type.Composite([
                route.schema.headers,
                Type.Object({ authorization: Type.String() }),
            ])
        }
    })

    done()
})
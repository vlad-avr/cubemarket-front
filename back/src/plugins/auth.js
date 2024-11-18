import { Type } from "@fastify/type-provider-typebox";
import fastifyPlugin from "fastify-plugin";
import jwt from 'jsonwebtoken'
import 'dotenv/config';

export const Auth = fastifyPlugin.default((server, opts, done) => {
    server.addHook('onRoute', (route, done) => {
        if (route.method === 'HEAD') {
            return
        }

        route.schema ??= {}

        route.schema.security = [
            {
              BearerAuth: [],
            },
        ]
    })

    server.addHook('onRequest', (request, reply, done) => {
        const token = request.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        request.user = decoded

        done()
    })

    done()
})
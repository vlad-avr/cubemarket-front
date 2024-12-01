import fastifyPlugin from "fastify-plugin";
import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { Forbidden } from "./error/forbidden.js";
import { CustomError } from "./error/custom-error.js";

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
        if(!request.headers.authorization){
            throw new Forbidden()
        }
        const token = request.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(decoded.blocked){
            throw new CustomError('User blocked', 403)
        }
        request.user = decoded

        done()
    })

    done()
})
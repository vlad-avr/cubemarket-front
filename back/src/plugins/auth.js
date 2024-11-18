import fastifyPlugin from "fastify-plugin";

export const Auth = fastifyPlugin.default((server, opts, done) => {
    server.addHook('onRequest', (request, reply, done) => {
        const jwt = request.headers.authorization
        console.log(jwt)

        done()
    })

    done()
})
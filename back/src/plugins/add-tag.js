import fastifyPlugin from "fastify-plugin"

export const AddTagPlugin = fastifyPlugin.default((server, opts, done) => {
    server.addHook('onRoute', (route) => {
        if (route.method === 'HEAD') {
            return
        }
        
        route.schema ??= {}
        route.schema.tags = [opts.tag]
    })

    done()
})
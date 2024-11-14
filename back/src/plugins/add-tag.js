import { fastifyPlugin } from "fastify-plugin"

export const AddTagPlugin = (tag) => {
    return (route) => {
        if (route.method === 'HEAD') {
            return
        }
        
        route.schema ??= {}
        route.schema.tags = [tag]
    }
}
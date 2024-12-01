import fastifyPlugin from "fastify-plugin";
import 'dotenv/config';
import { Forbidden } from "./error/forbidden.js";
import { BadRequest } from "./error/bad-request.js";
import { getUser } from "../components/user/logic.js";

export const Role = fastifyPlugin.default((server, opts, done) => {
    server.addHook('onRequest', async (request, reply) => {
        if(!request.user){
            throw new BadRequest("Where da user at")
        }
        const user = await getUser(request.user.id)
        if(opts.roles.includes(user.role)){
            throw new Forbidden("Insufficient role")
        }
    })

    done()
})
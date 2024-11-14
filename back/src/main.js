import Fastify from 'fastify'
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import prettifier from "@mgcrea/pino-pretty-compact";
import { ControllerRegistrator } from './plugins/controller-registrator.js';
import { Swagger } from './plugins/swagger.js';

const fastify = Fastify({
  logger: {
    level: "debug",
    transport: {
      target: "@mgcrea/pino-pretty-compact",
      options: { translateTime: "HH:MM:ss Z", ignore: "pid,hostname" },
    },
  }
})

fastify.register(Swagger, { prefix: '/docs' })
fastify.register(fastifyRequestLogger);
fastify.register(ControllerRegistrator)

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 5050, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})

await fastify.ready()

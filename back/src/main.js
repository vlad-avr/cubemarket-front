import Fastify from 'fastify'
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import prettifier from "@mgcrea/pino-pretty-compact";
import { ControllerRegistrator } from './plugins/controller-registrator.js';

const fastify = Fastify({
  logger: {
    level: "debug",
    transport: {
      target: "@mgcrea/pino-pretty-compact",
      options: { translateTime: "HH:MM:ss Z", ignore: "pid,hostname" },
    },
  }
})

fastify.register(fastifyRequestLogger);
fastify.register(ControllerRegistrator)
// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 5050, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})

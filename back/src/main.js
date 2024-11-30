import Fastify from 'fastify'
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import prettifier from "@mgcrea/pino-pretty-compact";
import { ControllerRegistrator } from './plugins/controller-registrator.js';
import { Swagger } from './plugins/swagger.js';
import { errorHandler } from './plugins/error/error-handler.js';
import fastifyCors from '@fastify/cors';

const fastify = Fastify({
  logger: {
    level: "debug",
    transport: {
      target: "@mgcrea/pino-pretty-compact",
      options: { translateTime: "HH:MM:ss Z", ignore: "pid,hostname" },
    },
  }
}).withTypeProvider()

fastify.options('*', async (req, rep) => {
  rep.status(204)
    .header('Access-Control-Allow-Origin', '*')
    .header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .header('Access-Control-Allow-Credentials', 'true')
    .send();
});

fastify.register(fastifyCors, {
  origin: '*', // Allow all origins (use with caution)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

fastify.register(Swagger, { prefix: '/docs' });
fastify.register(fastifyRequestLogger);
fastify.register(ControllerRegistrator);

fastify.setErrorHandler(errorHandler)

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 5051, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})

await fastify.ready()

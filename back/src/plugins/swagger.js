import swagger from '@fastify/swagger'
import { fastifyPlugin } from 'fastify-plugin'
import swaggerUi from '@fastify/swagger-ui'

export const Swagger = fastifyPlugin((server, opts, done) => {
    server.register(swagger, {
        openapi: {
          openapi: '3.0.0',
          info: {
            title: 'Cubemarket API',
            version: '0.1.0'
          },
          externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
          }
        }
      })
      
    server.register(swaggerUi, {routePrefix: '/docs'})

    done()
})
import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(memoriesRoutes)

app.get('/', () => {
  return 'Hello world!'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server listening on port 3333')
  })

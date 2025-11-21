import { fetch } from './domain/infra/http'
import { websocket } from './domain/infra/ws'

const port = Bun.env.PORT ? Bun.env.PORT : 3001
if (!port) throw new Error('Missing `PORT`')

const server = Bun.serve({ port, fetch, websocket })
console.log(`Server running on ${server.hostname}:${server.port}`)

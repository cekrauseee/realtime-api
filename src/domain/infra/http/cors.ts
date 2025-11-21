const getCorsHeaders = () => {
  const origin = Bun.env.WEB_URL
  if (!origin) throw new Error('Missing `WEB_URL`')

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Cookie',
    'Access-Control-Allow-Credentials': 'true'
  }
}

export const addCorsHeaders = (res: Response): Response => {
  const headers = new Headers(res.headers)
  const cors = getCorsHeaders()

  Object.entries(cors).forEach(([key, val]) => {
    if (!val) return
    headers.set(key, val)
  })

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers
  })
}

export const handlePreflight = (): Response =>
  new Response(null, {
    status: 204,
    headers: getCorsHeaders()
  })

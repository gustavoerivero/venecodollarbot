import { VercelRequest, VercelResponse } from '@vercel/node'
import { cronVercel, startVercel } from '../src'

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {
    await startVercel(req, res)
    if (req.url === '/api/cron') {
      cronVercel()
    }
  } catch (e: any) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>')
    console.error(e.message);
  }
}

import { VercelRequest, VercelResponse } from '@vercel/node'
import { cronVercel, startVercel } from '../../src'

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {
    await startVercel(req, res)
    cronVercel()
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>This is the route to the cronjob</h1><p>Well, that it is.</p>')
  } catch (e: any) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem with the cronjob.</p>')
    console.error(e.message)
  }
}

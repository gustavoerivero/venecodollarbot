import { VercelRequest, VercelResponse } from '@vercel/node'
import { cronVercel, startVercel } from '../../src'

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {
    await startVercel(req, res)
    const resp = await cronVercel()
    res.setHeader('Content-Type', 'text/html')
    res.send({
      title: 'This is the cronjob site',
      resp
    })
  } catch (e: any) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem with the cronjob.</p>')
    console.error(e.message)
  }
}

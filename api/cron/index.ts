import { VercelRequest, VercelResponse } from "@vercel/node";
import { cronVercel } from "../../src";

export default async function handle(req: VercelRequest, res: VercelResponse) {
  try {

    const authHeader = req.headers.authorization;

    const { CRON_SECRET } = process.env;

    if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
      return res
        .status(401)
        .end("<h1>Authorization Error</h1><p>Sorry, there was a problem with the authorization cronjob.</p>");
    }

    const users = await cronVercel();
    console.info("Active users:", users);

  } catch (e: any) {
    res
      .status(500)
      .end("<h1>Server Error</h1><p>Sorry, there was a problem with the cronjob.</p>");
    console.error(e.message);
  }
};
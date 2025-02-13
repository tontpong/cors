import { NextApiRequest, NextApiResponse } from 'next'
import cors from '../../lib/cors'

export const config = {
  runtime: 'edge',
}

/*
export default async function handler(req: NextRequest) {
  // `cors` also takes care of handling OPTIONS requests
  return cors(
    req,
    new Response(JSON.stringify({ message: 'Hello World!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  )
}
*/

/* ============= */

export default async function handler(req : NextApiRequest , res : NextApiResponse) {
  const targetUrl = "https://www.facebook.com/share/p/16AcEsxYQz/";
  const facebookUserAgent =
    "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)";

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": facebookUserAgent
      },
      redirect: "manual"
    });

    const finalUrl = response.url;
    const statusCode = response.status;

    const headers: { [key: string]: string } = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const responseBody = await response.text();

    res.status(200).json({
      finalUrl,
      status: statusCode,
      headers,
      body: responseBody,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
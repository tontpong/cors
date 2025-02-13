import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
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

export default async function handler(/*req : NextApiRequest , res : NextResponse*/) {
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

const head = JSON.stringify(headers);
    const responseBody = await response.text();

    return NextResponse.json({
      finalUrl,
      status: statusCode,
      head,
      body: responseBody,
    },
{headers: { 'Content-Type': 'application/json' },
     status : 200});
  } catch (error) {
const err = error as Error;
    return NextResponse.json({ error: err.message },{status : 500});
  }
}
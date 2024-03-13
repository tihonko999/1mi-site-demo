import getFromMemcached from "../../helpers/getFromMemcached";

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const url = new URL(`https://${req.headers.host}${req.url}`);
    const key = url.searchParams.get("key");
    if (!key) return res.end();
    const data = await getFromMemcached(key);
    res.end(data);
  } catch (e) {
    res.statusCode = 500;
    res.end(e instanceof Error ? e.message : e);
  }
};

export default handler;

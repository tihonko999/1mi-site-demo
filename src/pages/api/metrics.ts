import { NextApiRequest, NextApiResponse } from "next";
// https://stackoverflow.com/questions/61136545/import-prom-from-prom-client-module-missing-but-its-installed-how-can-i-i
import { register, collectDefaultMetrics } from "prom-client";
collectDefaultMetrics({ register });

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  res.send(await register.metrics());
};

export default handler;

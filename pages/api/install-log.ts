import type { NextApiRequest, NextApiResponse } from 'next';
import { readLastLogs } from '../../lib/logger';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const logs = readLastLogs(4);
  res.status(200).json(logs);
}

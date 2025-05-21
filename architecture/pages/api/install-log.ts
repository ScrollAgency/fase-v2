// pages/api/install-log.ts
import { readLastLogs } from '../../lib/logger';

export default function handler(req, res) {
  const logs = readLastLogs(4);
  res.status(200).json(logs);
}

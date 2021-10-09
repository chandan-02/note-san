import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
  name: string | Promise<any>
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name:"Hello!" })
}

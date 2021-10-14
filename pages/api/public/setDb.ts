import type { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../helper/heroku_dburl';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if(process.env.DB_URL != db){
        process.env.DB_URL = db;
    }
    res.status(200).json({ success: true, msg:"done" })
}

export default handler;
import type { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/client';
import pool from '../../../helper/db';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == 'GET') {
        const session = await getSession({ req: req });
        if (!session) {
            return res.status(401).json({ success: false, msg: "Unauthorized User" })
        }else {
            let user = req.query.user;
            let user_db = req.query.user_db;
            if(user !='' && user_db != '' && user_db != 'no_username' ){
                try {
                    let query = `SELECT * FROM public_notes WHERE shared_by='${user}' ORDER BY id ASC`;
                    var res1 = await pool.query(query);
                }catch (error){
                    console.log(error)
                }
                try {
                    let query = `SELECT * FROM ${user_db} ORDER BY id ASC`;
                    var res2 = await pool.query(query);
                } catch (error){
                    console.log(error)
                }
                const result = [...res2.rows,...res1.rows]
                return res.status(200).json({ success: true, notes: result });
            }else {
                return res.status(400).json({ success: true, data: 'user or user_db not provided' });
            }
        }
    }
}

export default handler;
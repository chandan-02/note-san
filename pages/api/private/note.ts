import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import pool from '../../../helper/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req: req })
    if (!session) {
        res.status(401).json({ success: false, note: "Unauthorized User" })
    } else {
        let id = req.query.id;
        let db_user = req.query.db_user;

        if (id != undefined && db_user != undefined) {
            try {
                let query = `SELECT note,color FROM ${db_user} WHERE id='${id}'                                         `;
                const data = await pool.query(query);
                return res.status(200).json({ success: true, note: data.rows[0] })
            } catch (error) {
                console.log(error)
                return res.status(500).json({ success: false, note: 'error' })
            }
        } else {
            return res.status(400).json({ success: false, note: 'id & user not provided' })
        }
    }
}

export default handler;
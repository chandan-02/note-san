import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../helper/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        let user = req.body.user;
        if (user != '') {
            let n = user.split('.').join('_')
            n = n.split('-').join('_')
            n = n.split(' ').join('_')
            user = ('db_' + n).toLowerCase();
            let query = `SELECT EXISTS (SELECT FROM information_schema.tables where table_name='${user}');`;
            const ress = await pool.query(query);
            // console.log(user, ':', ress.rows[0].exists)
            if (!ress.rows[0].exists) {
                query = `CREATE TABLE ${user}(
                        id UUID PRIMARY KEY NOT NULL,
                        color VARCHAR(100) NOT NULL,
                        note TEXT NOT NULL
                    );`;
                await pool.query(query);
            }
            res.status(201).json({ success: true, msg: user })
        } else {
            res.status(200).json({ success: true, msg: "no_username" })
        }
    } catch (error) {
        res.status(400).json({ success: false, msg: error })
    }
}

export default handler;
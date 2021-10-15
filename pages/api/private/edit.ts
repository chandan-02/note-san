import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import pool from '../../../helper/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req: req });
    if (!session) {
        res.status(401).json({ success: false, msg: "Unauthorized user" })
    } else {
        //start here 
        if (req.method == 'PUT') {
            let id = req.body.id;
            let db_user = req.body.db_user;
            let note = req.body.note;
            let color = req.body.color;
            try {
                let query = `UPDATE ${db_user} SET note=$1,color=$2 WHERE id=$3`;
                let data = [note,color,id];
                const resd = await pool.query(query,data);
                resd.command == 'UPDATE' && resd.rowCount == 1 && res.status(200).json({success:true,msg:"updated"});
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, msg: 'error' })
            }
        }
    }
}

export default handler;
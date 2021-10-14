import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import pool from '../../../helper/db';
//private
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req:req});
    if(!session){
        res.status(401).json({access:'unauthenticated user'})
    } else {
        const color = req.body.color;
        const note = req.body.content;
        let db_user = req.body.user 
        if (db_user != ''){
            let data = [color, note];
            try {
                let query = `INSERT INTO ${db_user}(color,note) VALUES($1,$2);`
                var resDatabase = await pool.query(query,data);
            } catch (error) {
                console.log(error)
            }
    
            if (resDatabase == undefined) {
                return res.status(400).json({ success: false, msg: "error" })
            }
    
            return res.status(201).json({ success: true, msg: "done" })
        }
    }
}

export default handler;
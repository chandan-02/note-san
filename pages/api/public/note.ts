import type  {NextApiRequest,NextApiResponse } from 'next';
import pool from '../../../helper/db';

const handler = async(req:NextApiRequest,res:NextApiResponse) => {
    let id = req.query.id;
    let user = req.query.user;

    if (id != undefined && user != undefined) {
        try {
            let query = `SELECT * FROM public_notes WHERE id='${id}' AND shared_by='${user}'`;
            const data =  await pool.query(query);   
            return res.status(200).json({success:true,note:data.rows[0]})
        } catch (error) {
            console.log(error)
            return res.status(500).json({success:false, note:'error'})
        }
    } else {
        return res.status(400).json({success:false, note:'id & user not provided'})
    }
}

export default handler;
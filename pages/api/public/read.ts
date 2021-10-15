import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../helper/db';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    let limit = req.query.limit;
    if (limit){
        try {
            const response = await pool.query('SELECT * FROM public_notes ORDER BY id ASC LIMIT 6')
            res.status(200).json({success:true,notes:response.rows})
        } catch (error) {
            res.status(500).json({success:false,msg:'something went wrong'})
            console.log('error')
        }
    }else {
        try {
            const response = await pool.query('SELECT * FROM public_notes ORDER BY id ASC')
            res.status(200).json({success:true,notes:response.rows})
        } catch (error) {
            res.status(500).json({success:false,msg:'something went wrong'})
            console.log('error')
        }
    }
}

export default handler;
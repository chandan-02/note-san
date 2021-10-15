import type {NextApiRequest,NextApiResponse} from 'next';
import pool from '../../../helper/db';

const handler = async(req:NextApiRequest ,res:NextApiResponse) => {
  if (req.method == 'PUT'){ 
      let id = req.body.id;
      let shared_by = req.body.shared_by;
      let note = req.body.note;
      let color = req.body.color;
      
      try {
        let query = `UPDATE public_notes SET note=$1,color='${color}' WHERE id='${id}' AND shared_by='${shared_by}'`;
        let data = [note]
        const resd = await pool.query(query,data);
        resd.command == 'UPDATE' && resd.rowCount == 1 && res.status(200).json({success:true,msg:"updated"});
      } catch (error) {
          console.log(error)
          res.status(400).json({success:false,msg:'error'})
      }
  }
}

export default handler;
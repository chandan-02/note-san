import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../helper/db';
//public 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method == 'POST'){
    const color = req.body.color;
    const user = req.body.user;
    const note = req.body.content;
    const user_img = req.body.user_img;
    let data = [color, note, user, user_img];
    try {
      let query = `INSERT INTO public_notes(id,color,note,shared_by,user_img) VALUES(uuid_generate_v4(),$1,$2,$3,$4);`
      var resDatabase = await pool.query(query, data);
    } catch (error) {
      console.log(error)
    }
    if (resDatabase == undefined) {
      return res.status(400).json({ success: false, msg: "error" })
    }
    return res.status(201).json({ success: true, msg: "done" })
  }
}

export default handler;
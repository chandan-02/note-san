import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../helper/db';
//public 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const color = req.body.color;
  const user = req.body.user;
  const note = req.body.content;
  const user_img = req.body.user_img;
  let data = [color, note, user, user_img];
  try {
    var resDatabase = await pool.query('INSERT INTO public_notes(color,note,shared_by,user_img) VALUES($1,$2,$3,$4);', data);
  } catch (error) {
    console.log(error)
  }
  if (resDatabase == undefined) {
    return res.status(400).json({ success: false, msg: "error" })
  }
  return res.status(201).json({ success: true, msg: "done" })
}

export default handler;
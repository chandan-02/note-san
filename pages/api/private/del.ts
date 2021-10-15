import type {NextApiRequest ,NextApiResponse} from 'next';
import pool from '../../../helper/db';

const handler = async(req:NextApiRequest,res:NextApiResponse) => {
    if (req.method == 'DELETE'){
        
        const id = req.body.id;
        const user_db = req.body.db_user;
        const user = req.body.user;
        const isPublic = user ? 'public' : 'private'; 

        if(isPublic == 'public'){
            try {
                let query =  `DELETE FROM public_notes WHERE id='${id}' AND shared_by='${user}'`;
                const resd = await pool.query(query);
                return resd.command == 'DELETE' && resd.rowCount == 1 && res.status(200).json({success:true,msg:'public_note_del'})
            } catch (error) {
                console.log(error)
            }
        }   
        if (isPublic == 'private'){
            try {
                let query = `DELETE FROM ${user_db} WHERE id='${id}'`;
                const resd = await pool.query(query);
                return resd.command == 'DELETE' && resd.rowCount == 1 && res.status(200).json({success:true,msg:'private_note_del'})

            } catch (error) {
                console.log(error)
            }
        }
        res.status(400).json({success:false,msg:'Something went wrong'})
    }
}   

export default handler; 
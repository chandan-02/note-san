import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
// import { UserCircleIcon } from '@heroicons/react/solid';
import { IPublicNotes } from '../interface/notes';

const PublicNotes: FC<IPublicNotes> = ({ note }) => {
    const router = useRouter();
    const [color,setColor] = useState<string>('');
    const handleView = () => {
        if (note.id && note.shared_by) {
            router.push({
                pathname: `/public/note`,
                query: {
                    id: note.id,
                    user: note.shared_by,
                }
            })
        }
    }
    useEffect(() => {
      setColor('bg-'+note.color);
    },[])
    return (
        <div className="my-4 md:m-5 w-full md:w-64 text-sm " onClick={()=>handleView()}>
            <div className={`${color} p-5 rounded filter hover:shadow-lg h-60 transition-all cursor-pointer flex flex-col justify-between`}>
                <h1 className="font-poppins">{note.note.length > 140 ? note.note.substring(0, 270) + '.....' : note.note}</h1>
            </div>
            <div className="flex items-center mt-3 cursor-default">
               <div>
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={note.user_img} className={`h-9 w-9 rounded-full ring-4 ring-${note.color}`} alt="user" />
               </div>

               <div className="ml-5">
                   <h1 className="font-poppins text-gray-500 text-base">shared by</h1>
                   <h1 className="font-poppins text-black text-sm">{note.shared_by}</h1>
               </div>
            </div>
        </div>
    )
}

export default PublicNotes;
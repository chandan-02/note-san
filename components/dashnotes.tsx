import { FC ,useState} from 'react';
import { IDashNotes } from '../interface/notes';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import Image from 'next/image';
const axios = require('axios').create({
    baseURL: process.env.API_BASE_URL
})

/**
   * PurgeCSS:
   * bg-m_purple
   * bg-m_light_orange
   * bg-m_dark_orange
   * bg-m_lime
   * bg-m_blue
   * ring-m_purple
   * ring-m_light_orange
   * ring-m_dark_orange
   * ring-m_lime
   * ring-m_blue
**/

const DashNotes: FC<IDashNotes> = ({ note, db_user }) => {
    const { mutate } = useSWRConfig();
    const router = useRouter();
    const [load, setload] = useState<boolean>(false)
    
    const handleEdit = () => {
        if (note.id && db_user != '' && db_user != 'no_username') {
            router.push({
                pathname: `/dashboard/${note.id}`,
                query: {
                    action: 'edit',
                    user: note.shared_by,
                    db_user: db_user
                }
            })
        }
    }

    const handleDel = async () => {
        if (note.id) {
            setload(true)
            try {
                const res = await axios.delete('/api/private/del', {
                    data: {
                        id: note.id,
                        db_user: db_user,
                        user: note.shared_by,
                    }
                })
                if (res.data.success && res.data.msg == 'public_note_del' || res.data.msg == 'private_note_del') {
                    mutate('/api/private/read');
                    setload(false);
                } 
            } catch (error) {
                setload(false)
                alert('something went wrong ')
            }
        }
    }
    const styleMain = `bg-${note.color} my-2 md:m-5 w-full md:w-64 p-5 text-sm rounded filter hover:shadow-lg h-60 transition-all cursor-pointer flex flex-col justify-between`
    return (
        <div className={styleMain}>
            <h1 className={`font-poppins ${note.note.search(' ') > 27 && 'truncate'} ${note.note.search(' ') == -1 && 'truncate'}`}>{note.note.length > 140 ? note.note.substring(0, 200) + '.....' : note.note}</h1>
            <div className="flex items-center ">
                <PencilAltIcon onClick={() => handleEdit()} className="h-5 w-5 text-black mr-4 hover:text-blue-700" />
                {
                    load ?
                        <Image src="/load.svg" alt="load" height="27" width="27" />
                        :
                        <TrashIcon onClick={() => handleDel()} className="h-5 w-5 text-black mr-4 hover:text-pink-800 " />
                }
                <h1 className="font-poppins font-semibold ml-2">{note.shared_by ? 'Public' : 'Private'}</h1>
            </div>
        </div>
    )
}

export default DashNotes;
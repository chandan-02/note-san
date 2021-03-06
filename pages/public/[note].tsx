import type { NextPage } from 'next';
import styles from '../../styles/Home.module.css';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
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
const Note: NextPage = () => {

    const router = useRouter();
    const [note, setNote] = useState({ note: null, color: null, user_img: '',shared_by: null });

    useEffect(() => {
        const { user, note, id } = router.query;

        const getNote = async () => {
            try {
                const response = user != undefined && note != undefined && await axios.get('/api/public/note', {
                    params: {
                        id: id,
                        user: user
                    }
                })
                setNote(response.data.note);
            } catch (error) {
                console.log(error)
            }
        }
        getNote();
    }, [router])

    return (
        <div className={styles.container}>
            <div className=" flex flex-col justify-center items-center mx-5 md:mx-10">
                <div className=" flex flex-col w-full md:w-1/2 ">

                    <div className="flex items-center cursor-pointer w-max" onClick={() => router.back()}>
                        <ArrowNarrowLeftIcon className="h-10 w-10 text-blue-500" />
                        <h1 className="pl-2 font-poppins font-semibold text-xl"> Go back </h1>
                    </div>

                    <div className="flex items-center mt-7 mb-3  cursor-default">
                        <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={note.user_img} className={`h-9 w-9 rounded-full ring-4 ring-${note.color}`} alt="user" />
                        </div>

                        <div className="ml-5">
                            <h1 className="font-poppins text-gray-500 text-base">shared by</h1>
                            <h1 className="font-poppins text-black text-sm">{note.shared_by}</h1>
                        </div>
                    </div>

                    <div className={`mt-5 bg-${note.color} p-5 rounded-md cursor-default`}>
                        {
                            note.note != null ?
                                <div>
                                    <h1 className="font-poppins">{note.note}</h1>
                                </div>
                                :
                                <div className="flex items-center justify-center">
                                    <Image src='/load.svg' alt="load_svg" height="40" width="40" />
                                    <h1 className="font-poppins">loading note</h1>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Note;
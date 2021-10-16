import type { NextPage } from 'next';
import styles from '../../styles/Home.module.css';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import useSWR, {useSWRConfig } from 'swr';
import PublicNotes from '../../components/publicNotes';
import { IPublicNote } from '../../interface/notes';
import Image from 'next/image';
import { useEffect,useState } from 'react';

const axios = require('axios').create({
  baseURL: process.env.API_BASE_URL
})

const PublicNote: NextPage = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [load,setLoad] = useState<boolean>(false);

  const fetcherPublic2 = async (url: string) => {
    const res = await axios.get(url)
    return res;
  }
  const { data: data2, error: error2 } = useSWR('/api/public/read', fetcherPublic2);

  useEffect(() => {
    setLoad(true);
    mutate('/api/public/read');
    if (data2 != undefined){
      if (data2.data.notes.length > 6){
        setLoad(false);
      } 
    }
  },[mutate,data2]);

  return (
    <div className={styles.container}>
      <div className="flex items-center cursor-pointer mx-5 md:mx-10" onClick={() => router.push('/')}>
        <ArrowNarrowLeftIcon className="h-10 w-10 text-blue-500" />
        <h1 className="pl-2 font-poppins font-semibold text-xl"> All public notes</h1>
      </div>
      <div className={styles.mainSection}>
        {data2 != undefined ? (
          data2.data.notes.map((note: IPublicNote, i: number) => {
            return <PublicNotes key={note.id} note={note} />
          })
        ) :
          <div className="flex items-center justify-center w-full my-5">
            <Image src='/load.svg' height="50" width="50" alt="loading" />
            <h1 className="text-gray-600 font-semibold text-base md:text-lg font-poppins">loading public notes... </h1>
          </div>
        }
      </div>
        <div className="mx-5 md:mx-10 ">
          {load && <Image src="/load.svg" height="35" width="35" alt="load" />}
        </div>
    </div>
  )
}
export default PublicNote;
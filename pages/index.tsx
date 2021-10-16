import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { ArrowNarrowRightIcon } from '@heroicons/react/solid';
import LoginPls from '../components/loginpls';
import { useSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import useAuth from '../helper/useAuth';
import useSWR from 'swr';
import { INote,IPublicNote } from '../interface/notes';
import DashNotes from '../components/dashnotes';
import PublicNotes from '../components/publicNotes';
import Image from 'next/image';
import useDimension from '../helper/getDimension';
import { useRouter } from 'next/router';
const axios = require('axios').create({
  baseURL: process.env.API_BASE_URL
})

const Home: NextPage = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [user, img] = useAuth(session, loading);
  const [db_user, setDB_USER] = useState<string>('');
  const [width,height] = useDimension();
  const fetcher = async (url: string) => {
    // console.log('fetcher : ', user, db_user)
    if (session && !loading) {
      const res = await axios.get(url, {
        params: {
          user: user,
          user_db: db_user
        }
      })
      return res;
    }
  }

  const fetcherPublic = async (url: string) => {
    const res = await axios.get(url,{params:{limit:true}})
    return res;
  }
  const { data: data1, error: error1 } = useSWR(user != '' && db_user != '' && db_user != 'no_username' ? '/api/private/read' : null, fetcher);
  const { data: data2, error: error2 } = useSWR('/api/public/read', fetcherPublic);

  useEffect(() => {
    const userExistsCheck = async () => {
      if (session && !loading) {
        try {
          const res = await axios.post('/api/private/exists', {
            user: user
          })
          setDB_USER(res.data.msg);
        } catch (error) {
          console.log(error)
        }
      }
    }
    userExistsCheck()
  }, [session, loading, user])

  return (
    <div className={styles.container}>

      <div className={styles.public}>
        {/* Title */}
        <div className={styles.title} onClick={()=>router.push('/public')}>
          <h1 className={styles.heading}>notes shared by others</h1>
          <ArrowNarrowRightIcon className={styles.icon} />
        </div>

        {/* Main Section */}
        <div className={styles.mainSection}>
          {data2 != undefined ? (
            data2.data.notes.map((note: IPublicNote, i: number) => {
              if (i < 6) {
                return <PublicNotes key={note.id} note={note}/>
              }
            })
          ) :
            <div className="flex items-center justify-center w-full my-5 transition-all animate-pulse">
              <Image src='/load.svg' height={width < 768 ? "40":"50"} width={width < 768 ? "40":"50"} alt="loading" />
              <h1 className="text-gray-600 font-semibold text-base md:text-lg font-poppins">loading public notes... </h1>
            </div>
            }
        </div>
      </div>

      <div className={styles.private}>
        {/* Title */}
        <div className={styles.title} onClick={()=>router.push('/dashboard')}>
          <h1 className={styles.heading}>your personal notes</h1>
          <ArrowNarrowRightIcon className={styles.icon} />
        </div>

        {/* Main Section */}
        {
          session && !loading ?
            <div className={styles.mainSection}>
              {data1 != undefined ? (
                data1.data.notes.length == 0 ?
                  <h1 className="my-5 font-poppins w-full text-center text-gray-600 font-semibold text-base md:text-lg">
                    You {`don't`} have any notes, add some notes to show here 😀
                  </h1>
                  :
                  data1.data.notes.map((note: INote, i: number) => {
                    if (i < 6) {
                      return <DashNotes key={note.id} note={note} db_user={db_user} />
                    }
                  })
              ) :
                <div className="flex items-center justify-center w-full my-5 transition-all animate-pulse">
                  <Image src='/load.svg' height={width < 768 ? "40":"50"} width={width < 768 ? "40":"50"} alt="loading" />
                  <h1 className="text-gray-600 font-semibold text-base md:text-lg font-poppins">loading your personal notes... </h1>
                </div>
              }
            </div>
            :
            <LoginPls loading={loading} text={loading ? "Please wait, verifying session." : "Hello User, please login to view personal notes."} />
        }
      </div>

    </div>
  )
}

export default Home;

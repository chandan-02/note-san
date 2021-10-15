import type { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import useAuth from '../../helper/useAuth';
import { PlusIcon } from '@heroicons/react/solid';
import styles from '../../styles/Dashboard.module.css';
import LoginPls from '../../components/loginpls';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';
import useSWR from 'swr';
import {INote} from '../../interface/notes';
import DashNotes from '../../components/dashnotes';
const axios = require('axios').create({
  baseURL: process.env.API_BASE_URL
})

const Dashboard: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [user, img] = useAuth(session, loading);
  const [db_user, setDB_USER] = useState<string>('');

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

  const { data, error } = useSWR(user != '' && db_user != '' && db_user != 'no_username' ? '/api/private/read' : null, fetcher);

  const handlerNewNote = (): void => {
    if (db_user != 'no_username') {
      router.push({
        pathname: 'dashboard/draft',
        query: {
          action: 'add',
          db_user: db_user,
        }
      })
    }
  }
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

  if (session && !loading && !error) {
    return (
      <div className={styles.container}>
        <h1 className="font-poppins text-lg md:text-xl md:mx-5">Welcome, {user}</h1>
        <div className={styles.headTab}>
          {/* add button */}
          <div onClick={() => handlerNewNote()}
            className={styles.addBtn}>
            <h1 className="text-white font-semibold text-base md:text-lg flex items-center">Add New Note
            {
              db_user != '' && db_user != 'no_username' ? 
              <PlusIcon  className="h-5 w-5 text-white ml-2"/>
              :
              <Image src="/load_fff.svg" alt="load" height="30"  width="30"/>
            }
            </h1>
          </div>
        </div>

        <div className="my-3 h-1 bg-pink-100 rounded-full md:mx-5"></div>

        {/* main section */}
        <div className={styles.mainSection}>
          {data != undefined ? (
            data.data.notes.length == 0 ? <h1 className="my-5 font-poppins w-full text-center text-gray-600 font-semibold text-base md:text-lg">You {`don't`} have any notes, add some notes to show here 😀</h1>:

            data.data.notes.map((note: INote) => {
              return <DashNotes key={note.id} note={note} db_user={db_user}/>
            })
          ) :
            <div className="flex items-center justify-center w-full my-5">
                <Image src='/load.svg' height="50" width="50" alt="loading" />
                <h1 className="text-gray-600 font-semibold text-base md:text-lg font-poppins">loading notes... </h1>
            </div>
          }
        </div>
      </div>
    )
  }
  return <LoginPls loading={loading} text={loading ? "Please wait, verifying session." : "Hello User, please login to view dashboard."} />
}

export default Dashboard;

import type { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import useAuth from '../../helper/useAuth';
import styles from '../../styles/Dashboard.module.css';
import LoginPls from '../../components/loginpls';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/dist/client/image';
import useSWR from 'swr';
const axios = require('axios').create({
  baseURL: 'http://localhost:3000'
})

interface INote  {
  color :string;
  id:string;
  note:string;
  shared_by?:string;
  user_img?:string;
}

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
        pathname: 'dashboard/addEditNote/',
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
        <h1 className="font-poppins text-lg md:text-xl ">Welcome, {user}</h1>
        <div className={styles.headTab}>
          {/* add button */}
          <div onClick={() => handlerNewNote()}
            className={styles.addBtn}>
            <h1 className="text-white font-semibold text-base md:text-lg">New Note
            </h1>
          </div>
        </div>

        {/* main section */}
        <div className={styles.mainSection}>
          {data != undefined ? (
            data.data.notes.map((note: INote) => {
              return <h1 key={note.id}>{note.note}</h1>
            })
          ) :
            <h1>loading..</h1>
          }
        </div>
      </div>
    )
  }
  return <LoginPls loading={loading} text={loading ? "Please wait, verifying session." : "Hello User, please login to view dashboard."} />
}

export default Dashboard;

import type { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import useAuth from '../../helper/useAuth';
import styles from '../../styles/Dashboard.module.css';
import LoginPls from '../../components/loginpls';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard: NextPage = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  const [user, img] = useAuth(session, loading);
  
  const handlerNewNote = ():void=> {
    router.push({
      pathname:'dashboard/addEditNote/',
      query:{
        action:'add'
      }
    })
  }

  if (session && !loading) {
    return (
      <div className={styles.container}>
        <h1 className="font-poppins text-lg md:text-xl ">Welcome, {user}</h1>
        <div className={styles.headTab}>
          {/* add button */}
          <div onClick={()=>handlerNewNote()}
          className={styles.addBtn}>
              <h1 className="text-white font-semibold text-base md:text-lg">New Note</h1>
          </div> 
        </div>

          {/* main section */}
          <div className={styles.mainSection}>
           {}
          </div>
      </div>
    )
  }
  return <LoginPls loading={loading} text={loading ? "Please wait, verifying session." : "Hello User, please login to view dashboard."} />
}

export default Dashboard;

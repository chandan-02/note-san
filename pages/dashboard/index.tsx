import type { NextPage } from 'next';
import { useSession } from 'next-auth/client';
import useAuth from '../../helper/useAuth';
import styles from '../../styles/Dashboard.module.css';
import LoginPls from '../../components/loginpls';

const Dashboard: NextPage = () => {
  const [session,loading] = useSession();
  const [user,img] = useAuth(session,loading);
  
  if(session && !loading) {
    return (
      <div className={styles.container}>
      <h1>Dashboard Page 😄</h1>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img className="transition-all animate-spin h-5 w-5" src="/load.svg" alt="loading" />
    </div>
    )
  }
  return (
    <LoginPls loading={loading} text={loading ? "Please wait, checking session.": "Hello User, please login to view dashboard."}/>
  )
}

export default Dashboard;

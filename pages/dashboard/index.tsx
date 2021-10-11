import type { NextPage } from 'next';
import styles from '../../styles/Dashboard.module.css';
const Dashboard: NextPage = () => {
 
  return (
    <div className={styles.container}>
      <h1>Dashboard Page 😄</h1>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      <img className="transition-all animate-spin h-5 w-5" src="/load.svg" alt="loading" />
    </div>
  )
}

export default Dashboard;

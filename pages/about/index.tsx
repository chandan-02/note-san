import type { NextPage } from 'next';
import styles from '../../styles/About.module.css';

const About: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>About note-san (❁´◡`❁)</h1>

        <div className={styles.box2}>
          <h1 className="font-poppins text-lg font-semibold">Frontend :  </h1>
          <p>NextJS, Typescript, Tailwind</p>
        </div>

        <div className={styles.box2}>
          <h1 className="font-poppins text-lg font-semibold">Backend : </h1>
          <p>Node.js, Express JS, postgreSQL </p>
        </div>

      </div>
    </div>
  )
}

export default About;

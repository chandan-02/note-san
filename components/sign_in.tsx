import { NextComponentType } from "next";
import styles from '../styles/SignIn.module.css';
import Link from 'next/link';

const SignIn: NextComponentType = () => {
    return (
        <Link href="/auth" passHref>
            <div className={styles.container}>
                <h1 className={styles.text} >sign in</h1>
            </div>
        </Link>
    )
}

export default SignIn;
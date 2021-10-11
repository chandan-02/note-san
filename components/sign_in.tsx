import { FC } from 'react';
import styles from '../styles/SignIn.module.css';
import Link from 'next/link';
// import Image from 'next/image';

interface IProps {
    loading: boolean
}
const SignIn: FC<IProps> = ({ loading }) => {
    if (!loading) {
        return (
            <Link href="/auth" passHref>
                <div className={styles.container}>
                    <h1 className={styles.text} >sign in</h1>
                </div>
            </Link>
        )
    }
    return (
        <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="mx-7 transition-all h-9 w-9" src="/load.svg" alt="loading" />
        </div>
    )
}

export default SignIn;
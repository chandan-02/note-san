import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../../styles/Auth.module.css';
import OAuth from '../../components/oauth_btn';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';

const Authenticate: NextPage = () => {
    const [session, load] = useSession();
    
    return (
        <div className={styles.container}>
            <div className={styles.box}>

                <Image src="/auth.svg" alt="auth_svg" height="300" width="350" />
                {
                    !session ? <h1 className={styles.text}>Sign-in using OAuth </h1> : <h1 className={styles.text}>Already signed-in, log out ? </h1>
                }
                {
                    !load && !session && (
                        <div>
                            <OAuth btnName="github" btnText="Sign in with Github" action="signin" />
                            <OAuth btnName="google" btnText="Sign in with Google" action="signin" />
                        </div>
                    )
                }
                {session && (<OAuth btnName="logout" btnText="signout " action="signout" />)}
            </div>
        </div>
    )
}

export default Authenticate;
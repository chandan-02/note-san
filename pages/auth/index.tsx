import type { NextPage } from 'next';
import Image from 'next/image';
import styles from '../../styles/Auth.module.css';
import OAuth from '../../components/oauth_btn';
import { useSession } from 'next-auth/client';
import { useState } from 'react';
import useAuth from '../../helper/useAuth';
import Loading from '../../components/loading';

const Authenticate: NextPage = () => {
    const [session, load] = useSession();
    const [spinner, setSpinner] = useState<boolean>(false);
    const [name,img] = useAuth(session,load);    

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <Image src="/auth.svg" alt="auth_svg" height="300" width="350" />
                {
                    !load ?
                        !session ? <h1 className={styles.text}>Sign-in using OAuth </h1> :
                            <div className="flex justify-center items-center">
                                <h1 className="font-poppins font-bold pb-2">{name}, &nbsp;</h1>
                                <p className={styles.text}> sign out ? </p>
                            </div>
                        :
                        <h1 className={styles.text}>Please wait</h1>
                }
                {
                    !load && !session && (
                        !spinner ?
                            <div>
                                <div onClick={() => setSpinner(!spinner)}>
                                    <OAuth btnName="github" btnText="Sign in with Github" action="signin" />
                                </div>
                                <div onClick={() => setSpinner(!spinner)}>
                                    <OAuth btnName="google" btnText="Sign in with Google" action="signin" />
                                </div>
                            </div> :
                            <Loading />
                    )
                }
                {session && (
                    !spinner ?
                        <div onClick={() => setSpinner(!spinner)}>
                            <OAuth btnName="logout" btnText="signout" action="signout" />
                        </div> :
                        <Loading />
                )}
            </div>
        </div>
    )
}

export default Authenticate;
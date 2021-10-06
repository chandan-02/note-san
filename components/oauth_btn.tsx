import React from 'react'
import styles from '../styles/Oauthbtn.module.css';
import { signIn, signOut } from 'next-auth/client'
import Link from 'next/link';

interface IProps {
    btnName: string,
    btnText: string,
    action: string
}

const OAuth: React.FC<IProps> = ({ btnName, btnText, action }) => {
    const handleSignIn = (e:any) => {
        e.preventDefault(); 
        action ==  'signin' ? signIn(btnName) : signOut();
    } 
    return (
        <Link href={`/api/auth/${action}`} passHref>
            <div className={styles.container} onClick={(e)=>handleSignIn(e)}>
                <h1 className={styles.text}>{btnText}</h1>
            </div>
        </Link>
    )
}

export default OAuth;
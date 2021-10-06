import type{ NextComponentType } from 'next/types'
import Head from 'next/head';
import styles from '../../styles/Header.module.css';
import Image from 'next/image';
import logo from '../../public/logo.png';
import SignIn from '../sign_in';
import { useRouter } from 'next/router';
import { useState,useEffect } from 'react';
import {useSession} from 'next-auth/client';

const Header: NextComponentType = () => {
    const router = useRouter();
    const [toggle,setToggle] = useState<Boolean>(true);
    const [session,load] = useSession(); 
    const hamMobile:string = 'w-screen flex flex-col justify-center items-center';
    const nav_items = [{name:'Home',path:'/'},{name:'Dashboard',path:'/dashboard'},{name:'About',path:'/about'}]

    const handleRoute = (e: string):void=> {
        router.push(e)
    }

    const whichPage= (name:string):number => {
        return router.pathname == name ? 700 : 600
    }

    useEffect(() => {
        // console.log(session,load);
    },[session,load])

    return (
        <>
            <Head>
                <title>note-san</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"></link>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.container}>
                <div className={styles.right}>
                    <div className={styles.ham} onClick={ ()=>setToggle(!toggle)}>
                        <Image src={'/ham.svg'} alt={"hamburger-menu"} height="35" width="35" />
                    </div>
                    <Image className={styles.logo} onClick={() => handleRoute('/')} src={logo} alt={"note-san_logo"} height="35" width="135"/>
                </div>

                <div className={toggle ? styles.nav_links : hamMobile}>
                    {
                        nav_items.map((nav,i)=>{
                            return  <h1 key={i} className={styles.text_style} style={{fontWeight:whichPage(nav.path)}} onClick={() => handleRoute(nav.path)}>{nav.name}</h1>
                        })
                    }
                    <SignIn />
                </div>
            </div>

        </>
    )
}

export default Header;
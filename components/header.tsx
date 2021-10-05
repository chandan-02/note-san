import type, { NextComponentType } from 'next/types'
import Head from 'next/head';

const Header: NextComponentType = () => {
    return (
        <>
            <Head>
                <title>note-san</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"></link>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>Hello Header</h1>
        </>
    )
}

export default Header;
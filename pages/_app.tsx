import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';
import {Provider} from 'next-auth/client';

import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [name,setName] = useState<string>('/')
  return (
    <Provider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  )
}
export default MyApp

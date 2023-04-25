import { useEffect } from 'react'
import { useRouter } from 'next/router';
import useUserAuth from '../hooks/useUserAuth';

import '../styles/globals.css'

function App({ Component, pageProps }) {

  return <Component {...pageProps} />;
}

export default App;

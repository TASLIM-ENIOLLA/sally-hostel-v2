import {Fragment} from 'react'
import Head from 'next/head'
import '/public/css/globals.css'

export default function App({Component, pageProps}){
    return (
        <Fragment>
            <Head>
                <title>Sally Hostel</title>
            </Head>
            <Component {...pageProps} />
            <div id = '__popup'></div>
        </Fragment>
    )
}

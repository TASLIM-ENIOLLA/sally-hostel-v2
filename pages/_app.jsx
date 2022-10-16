import {Fragment} from 'react'
import '/public/css/globals.css'

export default function App({Component, pageProps}){
    return (
        <Fragment>
            <Component {...pageProps} />
            <div id = '__popup'></div>
        </Fragment>
    )
}

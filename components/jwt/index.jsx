import {API} from '/config'
import {Component409} from '/components/400'
import {ParseObjectToFormData} from '/functions'
import {useEffect, useState, Fragment} from 'react'

export const JWTVerficationComponent = ({jwt_token, children}) => {
    const [verified, setVerification] = useState('PENDING')

    useEffect(() => {
        fetch(API.verify_token, {
            method: 'POST',
            body: ParseObjectToFormData({jwt_token})
        })
        .then(e => e.json())
        .then(({auth}) => setVerification(auth))
    }, [])

    if(verified === 'PENDING') return <Loader />
    else if(['STALLED', 'REJECTED'].includes(verified)) return <Component409 />
    else return (
        <Fragment>
            {children}
        </Fragment>
    )
}

function Loader(){
    return (
        <section className = 'min-vh-100 bg-banner py-5 d-flex a-i-c j-c-c'>
            <div className = 'loader-div fa-spin'></div>
            <style jsx>{`
                .bg-banner{
                    background: linear-gradient(rgba(255, 255, 255, .7), rgba(255, 255, 255, .7)), url(/images/Splash-bg.png);
                    background-size: cover;
                    background-position: center;
                }
                .loader-div{
                    border-right: 4px solid var(--gray);
                    border-bottom: 4px solid var(--gray);
                    border-left: 4px solid var(--gray);
                    border-top: 4px solid transparent;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    animation: a 1.2s linear infinite;
                }
                @keyframes a{
                    from{
                        transform: rotate(0deg)
                    }
                    to{
                        transform: rotate(360deg)
                    }
                }
            `}</style>
        </section>
    )
}

import {useEffect, useState} from 'react'
import DashboardTemplate from '/components/dashboard'
import {CookieStore} from '/functions'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({account_type, jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>logout</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid'>
                    <div className = 'row mb-5'>
                        <div className = 'col-12'>
                            <div className = 'container-fluid bg-white shadow-sm rounded-2x px-4 py-5'>
                                <div className = 'row'>
                                    <div className = 'col-12 mb-4'>
                                        <div>Are you sure you want to logout? No data will be lost.</div>
                                    </div>
                                    <div className = 'col-auto'>
                                        <button onClick = {() => CookieStore.removeCookie('SALLY_HOSTEL').then(() => window.location = '/')} className = 'border-0 rounded-1x text-capitalize theme-bg px-5 py-3 text-white half-bold'>logout</button>
                                    </div>
                                    <div className = 'col-auto'>
                                        <button className = 'border-0 rounded-1x text-capitalize bg-danger px-5 py-3 text-white half-bold'>cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <style jsx>{`
                    .z-index-10{
                        z-index: 10;
                    }
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies, headers}, query: {account_type}, resolvedUrl} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(!cookie) return {
        redirect: {
            destination: `/408`
        }
    }

    return {
        props: {
            account_type: 'student',
            jwt_token: cookie
        }
    }
}

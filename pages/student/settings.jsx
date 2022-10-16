import {useEffect, useState} from 'react'
import {JWTVerficationComponent} from '/components/jwt'
import DashboardTemplate from '/components/dashboard'
import {Read} from '/components/svg'
import {NotificationCard} from '/components/dashboard/NotificationCard'

export default function Index({account_type, jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>settings</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid py-5'>
                    <div className = 'row mb-5'>
                        <div className = 'col-12 mb-4'>
                            <div className = 'container-fluid py-4 theme-bg-light rounded-2x shadow'>
                                <div className = 'row a-i-c j-c-space-between'>
                                    <div className = 'col-sm-12 col-md-auto pb-3 pb-sm-0'>
                                        <p className = 'bold text-dark text-capitalize m-0'>Password</p>
                                    </div>
                                    <div className = 'col pb-3 pb-sm-0'>
                                        <div className = 'half-bold text-muted text-sentence double-line'>To change your password, we need to send a reset link to your email address. You can reset your password regularly to keep your account secure.</div>
                                    </div>
                                    <div className = 'col-sm-12 col-md-auto'>
                                        <button className = 'theme-bg py-3 px-5 rounded-2x shadow border-0 text-capitalize text-white half-bold shadow'>send mail</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'col-12 mb-4'>
                            <div className = 'container-fluid py-4 theme-bg-light rounded-2x shadow'>
                                <div className = 'row a-i-c j-c-space-between'>
                                    <div className = 'col-sm-12 col-md-auto pb-3 mb-sm-0'>
                                        <p className = 'bold text-dark text-capitalize m-0'>Account</p>
                                    </div>
                                    <div className = 'col pb-3 mb-sm-0'>
                                        <div className = 'half-bold text-muted text-sentence double-line'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.</div>
                                    </div>
                                    <div className = 'col-sm-12 col-md-auto'>
                                        <button className = 'bg-danger py-3 px-5 rounded-2x shadow border-0 text-capitalize text-white half-bold shadow'>delete account</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <style jsx>{`
                    .bg-light-fade-down{
                        background: linear-gradient(to bottom, #f8f9fa 80%, #f8f9fa00);
                    }
                    .z-index-10{
                        z-index: 10;
                    }
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {account_type}, resolvedUrl} = context
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

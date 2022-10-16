import {useEffect, useState} from 'react'
import {JWTVerficationComponent} from '/components/jwt'
import DashboardTemplate from '/components/dashboard'
import {HostelCard} from '/components/dashboard/HostelCard'

export default function Index({account_type, jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>favourites</div>
                        </div>
                        <div className = 'col-lg-4'>
                            <div className = 'row'>
                                <div className = 'col'>
                                    <input placeholder = 'Search hostels' className = 'p-3 bg-white rounded-2x border-0 outline-0 d-block w-100 shadow-sm' />
                                </div>
                                <div className = 'col-auto'>
                                    <button className = 'px-4 py-3 theme-bg rounded-2x border-0 outline-0 shadow-sm text-white text-capitalize'>search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid py-5'>
                    <div className = 'row mb-5'>
                        <div className = 'col-md-6 col-sm-6 col-xs-6 col-lg-4 col-xl-3 mb-4'>
                            <HostelCard />
                        </div>
                        <div className = 'col-md-6 col-sm-6 col-xs-6 col-lg-4 col-xl-3 mb-4'>
                            <HostelCard />
                        </div>
                        <div className = 'col-md-6 col-sm-6 col-xs-6 col-lg-4 col-xl-3 mb-4'>
                            <HostelCard />
                        </div>
                        <div className = 'col-md-6 col-sm-6 col-xs-6 col-lg-4 col-xl-3 mb-4'>
                            <HostelCard />
                        </div>
                        <div className = 'col-md-6 col-sm-6 col-xs-6 col-lg-4 col-xl-3 mb-4'>
                            <HostelCard />
                        </div>
                        <div className = 'col-md-6 col-sm-6 col-xs-6 col-lg-4 col-xl-3 mb-4'>
                            <HostelCard />
                        </div>
                        <div className = 'col-md-6 col-sm-6 col-xs-6 col-lg-4 col-xl-3 mb-4'>
                            <HostelCard />
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
    const {req: {cookies}, query: {account_type}, resolvedUrl} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(/\bhostel\-owner\b/.test(resolvedUrl)) return {
        notFound: true
    }
    else if(!cookie) return {
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

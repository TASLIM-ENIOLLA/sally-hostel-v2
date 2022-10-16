import {useEffect, useState, Fragment} from 'react'
import {JWTVerficationComponent} from '/components/jwt'
import DashboardTemplate from '/components/dashboard'

export default function Index({account_type, jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>overview</div>
                        </div>
                        <div className = 'col-12 col-sm-auto'>
                            <div className = 'container-fluid'>
                                <div className = 'bg-white a-i-c shadow-sm rounded-2x py-4 row'>
                                    <div className = 'col'>
                                        <h5 className = 'm-0 bold text-capitalize'>Taslim Eniolla</h5>
                                        <span className = 'text-muted text-capitalize'>hostel owner</span>
                                    </div>
                                    <div className = 'col-auto'>
                                        <img src = '/images/ellipse 5.png' width = '40' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid mb-4'>
                    <div className = 'row'>
                        <div className = 'col-12 mb-4'>
                            <div className = 'row mb-4'>
                                <div className = 'col-12 mb-4'>
                                    <div className = 'row j-c-space-between'>
                                        <div className = 'col-auto'>
                                            <h5 className = 'bold text-dark text-capitalize m-0'>my hostels</h5>
                                        </div>
                                        <div className = 'col-auto'>
                                            <a href = './all-hostels' className = 'underline half-bold text-capitalize m-0'>view all</a>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'col-12'>
                                    <div className = 'row'>
                                        <div className = 'col-12 col-sm-6 col-md-4 col-lg-3 pb-4'>
                                            <HostelOverviewCard />
                                        </div>
                                        <div className = 'col-12 col-sm-6 col-md-4 col-lg-3 pb-4'>
                                            <HostelOverviewCard />
                                        </div>
                                        <div className = 'col-12 col-sm-6 col-md-4 col-lg-3 pb-4'>
                                            <HostelOverviewCard />
                                        </div>
                                        <div className = 'col-12 col-sm-6 col-md-4 col-lg-3 pb-4'>
                                            <HostelOverviewCard />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid mb-5'>
                    <div className = 'row'>
                        <div className = 'col-lg-5 col-md-7 col-auto'>
                            <div className = 'row'>
                                <div className = 'container-fluid'>
                                    <div className = 'col-12 bg-white shadow-sm border rounded-2x'>
                                        <div className = 'row py-4'>
                                            <div className = 'col-12 mb-5'>
                                                <h5 className = 'm-0 bold text-dark text-capitalize'>recent activity</h5>
                                            </div>
                                            <div className = 'col-12'>
                                                <div className = 'row'>
                                                    <div className = 'col-12 mb-3'>
                                                        <NotificationCard />
                                                    </div>
                                                    <div className = 'col-12 mb-3'>
                                                        <NotificationCard />
                                                    </div>
                                                    <div className = 'col-12 mb-3'>
                                                        <NotificationCard />
                                                    </div>
                                                    <div className = 'col-12 mb-3'>
                                                        <NotificationCard />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

function NotificationCard(){
    return (
        <div className = 'border-bottom pb-3'>
            <p className = 'text-sentence half-bold mb-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.</p>
            <span className = 'text-muted text-capitalize'>May 23, 2022</span>
        </div>
    )
}

function HostelOverviewCard(){
    return (
        <div className = 'container-fluid'>
            <div className = 'row theme-bg-light py-4 rounded-2x shadow'>
                <div className = 'col-auto mb-4'>
                    <h5 className = 'm-0 text-capitalize half-bold text-dark'>Hostel name</h5>
                </div>
                <div className = 'col-12'>
                    <div className = 'row j-c-space-between'>
                        <div className = 'col-auto'>
                            <h2 className = 'm-0 text-capitalize half-bold text-dark'>1023</h2>
                            <span className = 'text-capitalize text-muted'>rooms occupied</span>
                        </div>
                        <div className = 'col-auto'>
                            <h3 className = 'm-0 text-capitalize half-bold text-dark'>20</h3>
                            <span className = 'text-capitalize text-muted'>left</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, resolvedUrl} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(!cookie) return {
        redirect: {
            destination: `/408`
        }
    }

    return {
        props: {
            account_type: 'hostel-owner',
            jwt_token: cookie
        }
    }
}

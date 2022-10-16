import {useEffect, useState} from 'react'
import {Search, MapOutline, Map, Settings, Heart} from '/components/svg'
import {JWTVerficationComponent} from '/components/jwt'
import DashboardTemplate from '/components/dashboard'
import {HostelCard} from '/components/dashboard/HostelCard'

export default function Index({account_type, jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5'>
                    <div className = 'row j-c-space-between'>
                        <div className = 'col-lg-8'>
                            <div className = 'container bg-banner py-5 rounded-2x shadow'>
                                <div className = 'row'>
                                    <div className = 'col-12 mb-3'>
                                        <h5 className = 'mb-0 text-sentence text-white'>Stay with us and feel at home.</h5>
                                    </div>
                                    <div className = 'col'>
                                        <input placeholder = 'Search hostels...' className = 'p-3 bg-white rounded-2x border-0 outline-0 d-block w-100' />
                                    </div>
                                    <div className = 'col-auto'>
                                        <button className = 'px-5 py-3 theme-bg rounded-2x text-white border-0 outline-0 text-capitalize'>search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'col-lg-4'>
                            <div className = 'container bg-white py-4 rounded-2x shadow'>
                                <div className = 'row a-i-c mb-3'>
                                    <div className = 'col-auto'>
                                        <img src = '/images/userPic.png' />
                                    </div>
                                    <div className = 'col'>
                                        <h5 className = 'text-dark half-bold text-capitalize mb-0'>Welcome Sally</h5>
                                        <span className = 'text-capitalize text-muted'>student</span>
                                    </div>
                                </div>
                                <div className = 'row a-i-c'>
                                    <div className = 'col-auto'>
                                        <button className = 'text-muted bg-clear border-0'>
                                            <Settings />
                                        </button>
                                    </div>
                                    <div className = 'col'>
                                        <span className = 'text-capitalize text-muted'>customize / manage your profile</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid mb-4'>
                    <div className = 'row'>
                        <div className = 'col-lg-8 mb-4'>
                            <div className = 'row mb-4'>
                                <div className = 'col-12 mb-4'>
                                    <h5 className = 'half-bold text-dark text-capitalize'>most rated hostels</h5>
                                </div>
                                <div className = 'col-12'>
                                    <div className = 'row'>
                                        <div className = 'col-6 col-sm-4 col-md-6 col-lg-4 pb-4'>
                                            <HostelCard />
                                        </div>
                                        <div className = 'col-6 col-sm-4 col-md-6 col-lg-4 pb-4'>
                                            <HostelCard />
                                        </div>
                                        <div className = 'col-6 col-sm-4 col-md-6 col-lg-4 pb-4'>
                                            <HostelCard />
                                        </div>
                                        <div className = 'col-6 col-sm-4 col-md-6 col-lg-4 pb-4'>
                                            <HostelCard />
                                        </div>
                                        <div className = 'col-6 col-sm-4 col-md-6 col-lg-4 pb-4'>
                                            <HostelCard />
                                        </div>
                                        <div className = 'col-6 col-sm-4 col-md-6 col-lg-4 pb-4'>
                                            <HostelCard />
                                        </div>
                                        <div className = 'col-6 col-sm-4 col-md-6 col-lg-4 pb-4'>
                                            <HostelCard />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'col-lg-4 d-none d-lg-block'>
                            <div className = 'px-4 py-5 mt-5 po-sticky top-5pcent theme-bg rounded-2x'>
                                <h5 className = 'text-capitalize text-white half-bold mb-5'>your hostel</h5>
                                <p className = 'text-capitalize text-white half-bold mb-4'>best place hostel</p>
                                <div className = 'rounded-2x shadow-sm favourite-hostel mb-4'></div>
                                <div className = 'mb-4'>
                                    <p className = 'text-capitalize text-white half-bold mb-2'>features</p>
                                    <div>
                                        <div className = 'px-3 mr-3 d-inline-block mb-3 py-2 bg-warning text-dark text-sentence rounded-2x shadow-sm'>lorem</div>
                                        <div className = 'px-3 mr-3 d-inline-block mb-3 py-2 bg-warning text-dark text-sentence rounded-2x shadow-sm'>ipsum</div>
                                        <div className = 'px-3 mr-3 d-inline-block mb-3 py-2 bg-warning text-dark text-sentence rounded-2x shadow-sm'>dolor</div>
                                    </div>
                                </div>
                                <div>
                                    <p className = 'text-capitalize text-white half-bold mb-2'>details</p>
                                    <p className = 'text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <style jsx>{`
                    .top-5pcent{
                        top: 5%;
                    }
                    .bg-banner{
                        background: linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(../images/homeBanner.png);
                        background-size: cover;
                        background-position: center;
                    }
                    .favourite-hostel{
                        min-height: 180px;
                        background-image: url(/images/bestHostel.png);
                        background-size: cover;
                        background-position: center;
                    }
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
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
            account_type: 'student',
            jwt_token: cookie
        }
    }
}

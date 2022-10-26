import {API} from '/config'
import {useEffect, useState} from 'react'
import {ParseObjectToFormData} from '/functions'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelCard} from '/components/dashboard/HostelCard'
import {MostViewedHostel} from '/components/dashboard/MostViewedHostel'
import {Search, MapOutline, Map, Settings, Heart} from '/components/svg'

export default function Index({account_type, jwt_token}){
    const [hostelList, setHostelList] = useState()

    useEffect(() => {
        fetch(API.student.get_all_hostels, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({data}) => setHostelList(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5'>
                    <div className = 'row j-c-space-between'>
                        <div className = 'col-md-8 mb-4 mb-md-0'>
                            <div className = 'container-fluid bg-banner py-5 rounded-2x shadow'>
                                <form method = 'GET' action = './student/search' className = 'row'>
                                    <div className = 'col-12 mb-3'>
                                        <h5 className = 'mb-0 text-sentence text-white'>Stay with us and feel at home.</h5>
                                    </div>
                                    <div className = 'col'>
                                        <input placeholder = 'Search hostels...' name = 'q' className = 'p-3 bg-white rounded-2x border-0 outline-0 d-block w-100' />
                                    </div>
                                    <div className = 'col-auto'>
                                        <button className = 'px-5 py-3 theme-bg rounded-2x text-white border-0 outline-0 text-capitalize'>search</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className = 'col-md-4'>
                            <div className = 'container-fluid bg-white py-4 rounded-2x shadow'>
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
                                        <a href = './student/my-profile' className = 'text-capitalize text-muted'>customize / manage your profile</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <VerificationStatus jwt_token = {jwt_token} />
                <section className = 'container-fluid mb-4'>
                    <div className = 'row'>
                        <div className = 'col-lg-8 mb-4'>
                            <div className = 'row mb-4'>
                                <div className = 'col-12 mb-4'>
                                </div>
                                <div className = 'col-12 mb-4'>
                                    <h5 className = 'half-bold text-dark text-capitalize'>our hostels</h5>
                                </div>
                                <div className = 'col-12'>
                                    <div className = 'row'>{
                                        (hostelList && hostelList.length > 0)
                                        ? hostelList.map((hostelData) => (
                                            <div key = {hostelData.id} className = 'col-6 col-sm-4 col-md-6 col-lg-4 pb-4'>
                                                <HostelCard jwt_token = {jwt_token} {...hostelData} />
                                            </div>
                                        ))
                                        : (
                                            <div className = 'col-12'>
                                                <div className = 'text-center p-5 bg-white rounded-1x shadow-sm text-muted half-bold'>
                                                    No hostel available for now!
                                                </div>
                                            </div>
                                        )
                                    }</div>
                                </div>
                            </div>
                        </div>
                        <div className = 'col-lg-4 d-none d-lg-block'>
                            <MostViewedHostel jwt_token = {jwt_token} />
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
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

function VerificationStatus({jwt_token}){
    const [status, setStatus] = useState()

    useEffect(() => {
        fetch(API.student.verification_status, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({account_type, status}) => setStatus(status))
    }, [])

    return (
        <section className = 'container-fluid'>
            <div className = 'row a-i-c j-c-space-between mb-4'>
                <div className = 'col-12'>{(
                    (status === undefined || status === 1)
                    ? <></>
                    : (
                        (status === 0)
                        ? (
                            <div className = 'p-3 text-center bg-warning rounded shadow-sm text-capitalize text-muted half-bold'>Your account has not been verified. Click <a href = './student/verification' className = 'theme-color underline m-0'>here</a> to verify your account.</div>
                        )
                        : (
                            (status === 2)
                            ? (
                                <div className = 'p-3 text-center bg-warning rounded shadow-sm text-capitalize text-muted half-bold'>Your account has been suspended. Click <a href = './student/verification' className = 'theme-color underline m-0'>here</a> to know more.</div>
                            )
                            : <></>
                        )
                    )
                )}</div>
            </div>
        </section>
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

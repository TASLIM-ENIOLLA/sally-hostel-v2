import {API} from '/config'
import {ParseObjectToFormData} from '/functions'
import {useEffect, useState, Fragment} from 'react'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelOverviewCard} from '/components/dashboard/HostelOverviewCard'

export default function Index({account_type, jwt_token}){
    const [hostelList, setHostelList] = useState()

    useEffect(() => {
        fetch(`${API.hostel_owner.get_my_hostels}?count=${4}`, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({type, data}) => setHostelList(data.filter((_, index) => index < 4)))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>overview</div>
                        </div>
                        <div className = 'col-auto col-sm-auto'>
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
                <VerificationStatus jwt_token = {jwt_token} />
                <section className = 'container-fluid mb-4 pt-3'>
                    <div className = 'row'>
                        <div className = 'col-12 mb-4'>
                            <div className = 'row mb-4'>
                                <div className = 'col-12 mb-4'>
                                    <div className = 'row j-c-space-between'>
                                        <div className = 'col-auto'>
                                            <h5 className = 'bold text-dark text-capitalize m-0'>my hostels</h5>
                                        </div>
                                        <div className = 'col-auto'>
                                            <a href = './hostel-owner/my-hostels' className = 'underline half-bold text-capitalize m-0'>view all</a>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'col-12'>
                                    <div className = 'row'>{
                                        (hostelList)
                                        ? (
                                            (hostelList.length > 0)
                                            ? hostelList.map(({id, ...otherProps}) => (
                                                <div key = {id} className = 'col-12 col-sm-6 col-md-4 col-lg-3 pb-4'>
                                                    <HostelOverviewCard {...otherProps} />
                                                </div>
                                            ))
                                            : (
                                                <div className = 'col-12'>
                                                    <div className = 'text-center my-5 p-5 rounded-2x shadow-sm bg-white half-bold text-muted'>
                                                        <div className = 'py-3 half-bold'>
                                                            You haven't add any hostel yet. Click <a className = 'theme-color underline' href = './hostels/new'>here</a> to add hostels.
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                        : (
                                            <div className = 'col-12'>
                                                <div className = 'text-center my-5 p-5 rounded-2x shadow-sm bg-white half-bold text-muted'>
                                                    <div className = 'py-3 half-bold'>
                                                        Could not retrieve any hostel data
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid mb-5'>
                    <div className = 'row'>
                        <div className = 'col-lg-5 col-md-8 col-auto'>
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

function VerificationStatus({jwt_token}){
    const [status, setStatus] = useState()
    const [accountType, setAccountType] = useState('')

    useEffect(() => {
        fetch(API.hostel_owner.verification_status, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({account_type, status}) => {
            setStatus(status)
            setAccountType(account_type)
        })
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
                            <div className = 'p-3 text-center bg-warning rounded shadow-sm text-capitalize text-muted half-bold'>Your account has not been verified. Click <a href = './hostel-owner/verification' className = 'theme-color underline m-0'>here</a> to verify your account.</div>
                        )
                        : (
                            (status === 2)
                            ? (
                                <div className = 'p-3 text-center bg-warning rounded shadow-sm text-capitalize text-muted half-bold'>Your account has been suspended. Click <a href = './hostel-owner/verification' className = 'theme-color underline m-0'>here</a> to know more.</div>
                            )
                            : <></>
                        )
                    )
                )}</div>
            </div>
        </section>
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

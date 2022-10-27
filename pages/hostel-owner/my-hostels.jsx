import {API, SERVER} from '/config'
import {ParseObjectToFormData} from '/functions'
import {useEffect, useState, Fragment} from 'react'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelOverviewCard} from '/components/dashboard/HostelOverviewCard'

export default function Index({account_type, jwt_token}){
    const [hostelList, setHostelList] = useState()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        fetch(API.hostel_owner.get_my_hostels, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({type, data}) => setHostelList(data))

        fetch(API.hostel_owner.get_user_data, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({data}) => setUserData(data))
    }, [])

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
                                        <h5 className = 'm-0 bold text-capitalize'>{userData.f_name} {userData.l_name}</h5>
                                        <span className = 'text-muted text-capitalize'>{userData.account_type?.replace('_', ' ')}</span>
                                    </div>
                                    <div className = 'col-auto'>
                                        <ProfileImg src = {`${SERVER.BACKEND.URL}${userData.profile_img}`} width = '40' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
                                            <a href = './hostels/new' className = 'theme-bg half-bold text-white text-capitalize px-4 py-3 rounded-1x underline-0 shadow'>add new</a>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'col-12'>
                                    <div className = 'row'>{
                                        (hostelList)
                                        ? (
                                            (hostelList.length > 0)
                                            ? hostelList.map((each) => (
                                                <div key = {each.id} className = 'col-12 col-sm-6 col-md-4 col-lg-3 pb-4'>
                                                    <HostelOverviewCard href = {`./hostels/${each.id}`} {...each} />
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
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

function ProfileImg({src, width, onChange}){
    const [file, setFile] = useState()

    return (
        <div className = 'profile-img rounded-circle bg-light po-rel shadow-sm border' style = {{width: `${width}px`, height: `${width}px`}}>
            <style jsx>{`
                .profile-img{
                    background-image: url(${src});
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
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

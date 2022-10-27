import {API, SERVER} from '/config'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {ParseObjectToFormData} from '/functions'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelCard} from '/components/dashboard/HostelCard'

const hostelImageURL = `${SERVER.BACKEND.URL}images/hostel-owner/`

export default function Index({account_type, jwt_token}){
    const {query: {userID}} = useRouter()
    const [userData, setUserData] = useState()

    useEffect(() => {
        fetch(API.admin.get_user_data, {method: 'POST', body: ParseObjectToFormData({jwt_token, user_id: userID})})
        .then(e => e.json())
        .then(({data}) => setUserData(data) || console.log(userID))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>User: "{userData?.f_name}"</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid py-5'>{
                    (userData)
                    ? (
                        <div className = 'row mb-5'>
                            <div className = 'col-lg-8'>
                                <div className = 'row'>
                                    <div className = 'col-12 mb-5'>
                                            <ProfileImg src = {`${SERVER.BACKEND.URL}${userData.profile_img}`} width = '200' />
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>name</h5>
                                        <p className = 'text-muted text-sentence'>{userData.f_name} {userData.l_name}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>email</h5>
                                        <p className = 'text-muted'>
                                            <a className = 'underline' href = {`mailto://${userData.email}`}>{userData.email}</a>
                                        </p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>phone</h5>
                                        <p className = 'text-muted text-sentence'>
                                            <a className = 'underline' href = {`tel://${userData.phone}`}>{userData.phone}</a>
                                        </p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>account type</h5>
                                        <p className = 'text-muted text-sentence'>{userData.account_type.replace('_', ' ')}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>status</h5>
                                        <p className = 'text-muted text-sentence'>{userData.status}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>upload</h5>
                                        <p className = 'text-muted text-sentence'>{
                                            userData.uploads.map((each, index) => (
                                                <span key = {index} className = 'd-block w-100 mb-3 d-flex a-i-c'>
                                                    <span className = 'mr-3 bi-file-earmark-text-fill fa-2x'></span>
                                                    <a className = 'underline text-sentence theme-color' target = '_blank' href = {`${SERVER.BACKEND.URL}files/${userData.account_type.replace('_', '-')}/${userData.id}/${each}`}>{each}</a>
                                                </span>
                                            ))
                                        }</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        (userData === null)
                        ? (
                            <div className = 'p-5 text-center text-sentence text-dark half-bold bg-white rounded-2x shadow-sm'>Couldn't retrieve user data!</div>
                        )
                        : (
                            (
                                <div className = 'p-5 text-center text-sentence text-dark half-bold bg-white rounded-2x shadow-sm'>Loading...</div>
                            )
                        )
                    )
                }</section>
                <style jsx>{`
                    .z-index-10{
                        z-index: 10;
                    }
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

function ProfileImg({src, width, onChange}){
    const [file, setFile] = useState()

    useEffect(() => {
        if(typeof onChange === 'function') onChange(file)
    }, [file])

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
    const {req: {cookies}, query: {account_type}, resolvedUrl} = context
    const cookie = cookies['SALLY_HOSTEL_ADMIN']

    if(/\bstudent\b/.test(resolvedUrl)) return {
        notFound: true
    }
    else if(!cookie) return {
        redirect: {
            destination: `/408`
        }
    }

    return {
        props: {
            account_type: 'admin',
            jwt_token: cookie
        }
    }
}

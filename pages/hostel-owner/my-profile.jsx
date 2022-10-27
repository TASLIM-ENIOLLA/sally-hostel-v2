import {API, SERVER} from '/config'
import {notify2} from '/components/popup'
import {ParseObjectToFormData} from '/functions'
import {useEffect, useState, Fragment} from 'react'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelOverviewCard} from '/components/dashboard/HostelOverviewCard'

export default function Index({account_type, jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>profile</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid mb-4 pt-3'>
                    <div className = 'row'>
                        <div className = 'col-12 mb-4'>
                            <div className = 'row mb-4'>
                                <div className = 'col-12 mb-5'>
                                    <div className = 'row j-c-space-between'>
                                        <div className = 'col-auto'>
                                            <h5 className = 'bold text-dark text-capitalize m-0'>manage profile</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className = 'col-12 col-md-12 col-lg-9 -mx-auto'>
                                    <ProfileData jwt_token = {jwt_token} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

function ProfileData({jwt_token}){
    const [userData, setUserData] = useState()
    const [editedList, setEditedList] = useState()
    const [editable, setEditable] = useState(false)

    useEffect(() => {
        fetch(API.hostel_owner.get_user_data, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({type, message, data}) => setUserData(data))
    }, [])

    if(!userData) return <></>

    return (
        <div className = 'container'>
            <div className = 'row bg-white rounded-2x shadow-sm py-5'>
                <div className = 'd-none col-12 mb-5 pb-4'>
                    <ProfileImg src = {`${SERVER.BACKEND.URL}/${userData.profile_img}`} width = '130' />
                </div>
                <div className = 'col-sm-6 mb-5'>
                    <p className = 'text-sentence mb-1 half-bold text-muted'>first name</p>
                    <input onChange = {(e) => {
                        setEditedList({...editedList, f_name: e.target.value})
                        setUserData({...userData, f_name: e.target.value})
                    }} value = {userData.f_name} type = 'text' className = {`${!editable ? 'disabled bg-light' : ''} text-muted transit half-bold text-capitalize border p-3 rounded-1x border-dark bg-clear d-block w-100`} />
                </div>
                <div className = 'col-sm-6 mb-5'>
                    <p className = 'text-sentence mb-1 half-bold text-muted'>last name</p>
                    <input onChange = {(e) => {
                        setEditedList({...editedList, l_name: e.target.value})
                        setUserData({...userData, l_name: e.target.value})
                    }} value = {userData.l_name} type = 'text' className = {`${!editable ? 'disabled bg-light' : ''} text-muted transit half-bold text-capitalize border p-3 rounded-1x border-dark bg-clear d-block w-100`} />
                </div>
                <div className = 'col-sm-6 mb-5'>
                    <p className = 'text-sentence mb-1 half-bold text-muted'>email address</p>
                    <input onChange = {(e) => {
                        setEditedList({...editedList, email: e.target.value})
                        setUserData({...userData, email: e.target.value})
                    }} value = {userData.email} type = 'email' className = {`${!editable ? 'disabled bg-light' : ''} text-muted transit half-bold border p-3 rounded-1x border-dark bg-clear d-block w-100`} />
                </div>
                <div className = 'col-sm-6 mb-5'>
                    <p className = 'text-sentence mb-1 half-bold text-muted'>phone number</p>
                    <input onChange = {(e) => {
                        setEditedList({...editedList, phone: e.target.value})
                        setUserData({...userData, phone: e.target.value})
                    }} value = {userData.phone} type = 'phone' className = {`${!editable ? 'disabled bg-light' : ''} text-muted transit half-bold border p-3 rounded-1x border-dark bg-clear d-block w-100`} />
                </div>
                <div className = 'col-sm-6 mb-5'>
                    <p className = 'text-sentence mb-1 half-bold text-muted'>account type</p>
                    <input onChange = {(e) => {
                        setEditedList({...editedList, account_type: e.target.value})
                        setUserData({...userData, account_type: e.target.value})
                    }} value = {userData.account_type.replace('_', ' ')} type = 'text' className = {`disabled bg-light text-muted transit half-bold text-capitalize border p-3 rounded-1x border-dark bg-clear d-block w-100`} />
                </div>
                <div className = 'col-sm-6 mb-5'>
                    <p className = 'text-sentence mb-1 half-bold text-muted'>status</p>
                    <input onChange = {(e) => {
                        setEditedList({...editedList, status: e.target.value})
                        setUserData({...userData, status: e.target.value})
                    }} value = {userData.status} type = 'text' className = {`disabled bg-light text-muted transit half-bold text-capitalize border p-3 rounded-1x border-dark bg-clear d-block w-100`} />
                </div>
                <div className = 'col-12 col-md-6 mb-5'>
                    <button onClick = {() => (
                        (!editable)
                        ? setEditable(true)
                        : (
                            (Object.values(editedList || {}).length > 0)
                            ? fetch(API.hostel_owner.update_data, {method: 'POST', body: ParseObjectToFormData({...editedList, jwt_token})})
                            .then(e => e.json())
                            .then(({type, message}) => notify2({type, message, onSucceed: () => setEditable(false)}))
                            : notify2({type: 'danger', message: 'You haven\'t made any changes.'})
                        )
                    )} className = 'py-3 px-5 border-0 shadow text-capitalize rounded-1x theme-bg text-white half-bold'>{(
                        (editable)
                        ? 'update data'
                        : 'edit profile'
                    )}</button>
                </div>
            </div>
        </div>
    )
}

function ProfileImg({src, width, onChange}){
    const [file, setFile] = useState()

    useEffect(() => {
        if(typeof onChange === 'function') onChange(file)
    }, [file])

    return (
        <div className = 'profile-img rounded-circle bg-light po-rel shadow-sm border' style = {{width: `${width}px`, height: `${width}px`}}>
            <label className = 'cursor-pointer d-flex a-i-c j-c-c po-abs bottom-0 right-0 rounded-circle shadow bg-dark' style = {{width: '30px', height: '30px'}}>
                <span className = 'bi-pencil-square fo-s-16 text-white'></span>
                <input type = 'file' onChange = {(e) => setFile(e.target.files)} hidden = {true} />
            </label>
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

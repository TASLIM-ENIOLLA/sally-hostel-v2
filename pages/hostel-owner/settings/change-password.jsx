import {API} from '/config'
import {Check} from '/components/svg'
import {notify2} from '/components/popup'
import {useState, useEffect} from 'react'
import {ParseObjectToFormData} from '/functions'
import {JWTVerficationComponent} from '/components/jwt'
import Pages from '/components/pages/hostel-owner/hostels/new'
import PagesContext from '/contexts/pages/hostel-owner/hostels/new'
import {SplitPageComponent} from '/components/dashboard/SplitPageComponent'

export default function ChangePassword({jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <SplitPageComponent
                title = 'Change your password in a few steps'
                subTitle = 'Secure your account by changing your password instantly'>
                <PageComponent jwt_token = {jwt_token} />
            </SplitPageComponent>
        </JWTVerficationComponent>
    )
}

function PageComponent({jwt_token}){
    const [passwords, setPasswords] = useState({
        old: '', new: '', c_new: ''
    })

    return (
        <div className = 'rounded-2x shadow py-5 px-3 bg-white text-left'>
            <form onSubmit = {(e) => {
                e.preventDefault()

                fetch(API.hostel_owner.change_password, {method: 'POST', body: ParseObjectToFormData({
                    ...passwords,
                    jwt_token
                })})
                .then(e => e.json())
                .then(({type, message}) => notify2({
                    type,
                    message,
                    duration: 4000,
                    onSucceed: () => {
                        setPasswords({old: '', new: '', c_new: ''})
                        window.location = './'
                    }
                }))
            }} className = 'container-fluid py-2'>
                <div className = 'row a-i-c mb-4'>
                    <div className = 'col-auto'>
                        <a href = './' className = 'border-0 bg-clear'>
                            <span className = 'bi-arrow-left-circle text-dark fo-s-20'></span>
                        </a>
                    </div>
                    <div className = 'col'>
                        <h4 className = 'text-dark m-0 bold'>Change password</h4>
                    </div>
                </div>
                <div className = 'row a-i-c mb-4'>
                    <div className = 'col'>
                        <p className = 'half-bold mb-2'>Old password</p>
                        <input type = 'password' value = {passwords.old} onChange = {(e) => setPasswords({
                            ...passwords,
                            old: e.target.value
                        })} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                    </div>
                </div>
                <div className = 'row a-i-c mb-4'>
                    <div className = 'col'>
                        <p className = 'half-bold mb-2'>New password</p>
                        <input type = 'password' value = {passwords.new} onChange = {(e) => setPasswords({
                            ...passwords,
                            new: e.target.value
                        })} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                    </div>
                </div>
                <div className = 'row a-i-c mb-4'>
                    <div className = 'col'>
                        <p className = 'half-bold mb-2'>Confirm new password</p>
                        <input type = 'password' value = {passwords.c_new} onChange = {(e) => setPasswords({
                            ...passwords,
                            c_new: e.target.value
                        })} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                    </div>
                </div>
                <div className = 'row a-i-c'>
                    <div className = 'col-auto'>
                        <button type = 'submit' className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(!cookie) return {
        redirect: {
            destination: '/408'
        }
    }

    return {
        props: {jwt_token: cookie}
    }
}

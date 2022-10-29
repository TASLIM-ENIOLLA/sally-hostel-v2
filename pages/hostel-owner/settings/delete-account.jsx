import {API} from '/config'
import {Check} from '/components/svg'
import {notify2} from '/components/popup'
import {useState, useEffect} from 'react'
import {ParseObjectToFormData, CookieStore} from '/functions'
import {JWTVerficationComponent} from '/components/jwt'
import Pages from '/components/pages/hostel-owner/hostels/new'
import PagesContext from '/contexts/pages/hostel-owner/hostels/new'
import {SplitPageComponent} from '/components/dashboard/SplitPageComponent'

export default function DeletePassword({jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <SplitPageComponent
                title = 'Delete your account and all relating data'
                subTitle = {`You will lose access to this account including all data and files. Proceed on when you're certain!`}>
                <PageComponent jwt_token = {jwt_token} />
            </SplitPageComponent>
        </JWTVerficationComponent>
    )
}

function PageComponent({jwt_token}){
    return (
        <div className = 'rounded-2x shadow py-5 px-3 bg-white text-left'>
            <form onSubmit = {(e) => {
                e.preventDefault()

                fetch(API.hostel_owner.delete_account, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
                .then(e => e.json())
                .then(({type, message}) => notify2({
                    type,
                    message,
                    duration: 4000,
                    onSucceed: () => {
                        CookieStore.removeCookie('SALLY_HOSTEL')
                        window.location = '/'
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
                        <h4 className = 'text-dark m-0 bold'>Delete account</h4>
                    </div>
                </div>
                <div className = 'row a-i-c'>
                    <div className = 'col'>
                        <div className = 'text-sentence text-danger m-0 half-bold'>All record and files relating to ths account will be deleted. Proceed only when you are certain as action is irreversible.</div>
                    </div>
                </div>
                <div className = 'row a-i-c pt-5'>
                    <div className = 'col-auto'>
                        <button type = 'submit' className = 'underline-0 bg-danger px-5 py-3 half-bold rounded-1x text-white border-0 text-capitalize'>delete account</button>
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

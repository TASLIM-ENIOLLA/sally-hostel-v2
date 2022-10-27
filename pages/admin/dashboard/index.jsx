import {API, SERVER} from '/config'
import {ParseObjectToFormData} from '/functions'
import {useEffect, useState, Fragment} from 'react'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {'admin'}>

            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, resolvedUrl} = context
    const cookie = cookies['SALLY_HOSTEL_ADMIN']

    if(!cookie) return {
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

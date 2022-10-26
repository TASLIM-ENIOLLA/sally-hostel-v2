import {API} from '/config'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {ParseObjectToFormData} from '/functions'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelCard} from '/components/dashboard/HostelCard'

export default function Index({account_type, jwt_token}){
    const {query: {q, c}} = useRouter()

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-sentence theme-color'>search for "{q}"</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid py-5'>
                    <div className = 'row mb-5'>

                    </div>
                </section>
                <style jsx>{`
                    .z-index-10{
                        z-index: 10;
                    }
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {account_type}, resolvedUrl} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(/\bhostel\-owner\b/.test(resolvedUrl)) return {
        notFound: true
    }
    else if(!cookie) return {
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

import {API} from '/config'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import {ParseObjectToFormData} from '/functions'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelCard} from '/components/dashboard/HostelCard'

export default function Index({account_type, jwt_token}){
    const {query: {q, c}} = useRouter()
    const [hostelList, setHostelList] = useState()

    useEffect(() => {
        fetch(API.student.search, {method: 'POST', body: ParseObjectToFormData({query: q, jwt_token})})
        .then(e => e.json())
        .then(({data}) => setHostelList(data))
    }, [])

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
                <section className = 'container-fluid mb-5'>
                    <form method = 'GET' action = './search' className = 'row'>
                        <div className = 'col-lg-8'>
                            <div className = 'row'>
                                <div className = 'col'>
                                    <input defaultValue = {q} autoFocus = {true} placeholder = 'Search hostels...' name = 'q' className = 'p-3 bg-white rounded-2x border-0 outline-0 d-block shadow w-100' />
                                </div>
                                <div className = 'col-auto'>
                                    <button className = 'px-5 py-3 theme-bg rounded-2x text-white border-0 outline-0 text-capitalize'>search</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
                <section className = 'container-fluid mb-4'>
                    <div className = 'row'>
                        <div className = 'col-12 mb-4'>
                            <div className = 'row mb-4'>
                                <div className = 'col-12 mb-4'>
                                </div>
                                <div className = 'col-12 mb-4'>
                                    <h5 className = 'half-bold text-dark text-capitalize'>search result</h5>
                                </div>
                                <div className = 'col-12'>
                                    <div className = 'row'>{
                                        (hostelList && hostelList.length > 0)
                                        ? hostelList.map((hostelData) => (
                                            <div key = {hostelData.id} className = 'col-6 col-sm-4 col-md-4 col-lg-3 pb-4'>
                                                <HostelCard jwt_token = {jwt_token} {...hostelData} />
                                            </div>
                                        ))
                                        : (
                                            (hostelList && hostelList.length === 0)
                                            ? (
                                                <div className = 'col-12'>
                                                    <div className = 'text-center p-5 bg-white rounded-1x shadow-sm text-muted half-bold'>
                                                        Empty result returned!
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <div className = 'col-12'>
                                                    <div className = 'text-center p-5 bg-white rounded-1x shadow-sm text-muted half-bold'>
                                                        No hostel available for now!
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }</div>
                                </div>
                            </div>
                        </div>
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

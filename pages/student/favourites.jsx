import {API} from '/config'
import {useEffect, useState} from 'react'
import {ParseObjectToFormData} from '/functions'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelCard} from '/components/dashboard/HostelCard'

export default function Index({account_type, jwt_token}){
    const [hostelList, setHostelList] = useState()

    useEffect(() => {
        fetch(API.student.get_favourite_hostels, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({data}) => setHostelList(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>favourites</div>
                        </div>
                        <div className = 'col-lg-4'>
                            <form method = 'GET' action = './search' className = 'row'>
                                <div className = 'col'>
                                    <input placeholder = 'Search hostels' className = 'p-3 bg-white rounded-2x border-0 outline-0 d-block w-100 shadow-sm' name = 'q' />
                                    <input hidden = {true} name = 'c' defaultValue = 'favourites' />
                                </div>
                                <div className = 'col-auto'>
                                    <button className = 'px-4 py-3 theme-bg rounded-2x border-0 outline-0 shadow-sm text-white text-capitalize'>search</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid py-5'>
                    <div className = 'row mb-5'>{
                        (hostelList && hostelList.length > 0)
                        ? [...hostelList].map((hostelData) => (
                            <div key = {hostelData.id} className = 'col-6 col-md-4 col-lg-3 pb-4'>
                                <HostelCard onStateChange = {(isFavourite) => {
                                    if(!isFavourite) setHostelList(hostelList.filter(hostel => hostel.id !== hostelData.id))
                                }} jwt_token = {jwt_token} {...hostelData} />
                            </div>
                        ))
                        : (
                            <div className = 'col-12'>
                                <div className = 'text-center p-5 bg-white rounded-1x shadow-sm text-muted half-bold'>
                                    You have not chosen a favourite hostel!
                                </div>
                            </div>
                        )
                    }</div>
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

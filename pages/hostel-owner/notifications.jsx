import {API} from '/config'
import {Read} from '/components/svg'
import {useEffect, useState} from 'react'
import {ParseObjectToFormData} from '/functions'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {NotificationCard} from '/components/dashboard/NotificationCard'

export default function Index({account_type, jwt_token}){
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        fetch(API.hostel_owner.notifications, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({data}) => setNotifications(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>notifications</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid py-5'>
                    <div className = 'row mb-5'>{
                        (notifications.length > 0)
                        ? notifications.map(each => (
                            <div className = 'col-12 mb-4' key = {each.id}>
                                <NotificationCard {...each} />
                            </div>
                        ))
                        : (
                            <div className = 'col-12 mb-4'>
                                <div className = 'p-5 shadow-sm rounded-2x bg-light text-center half-bold text-muted text-sentence'>You do not have any notification for now</div>
                            </div>
                        )
                    }</div>
                </section>
                <style jsx>{`
                    .bg-light-fade-down{
                        background: linear-gradient(to bottom, #f8f9fa 80%, #f8f9fa00);
                    }
                    .z-index-10{
                        z-index: 10;
                    }
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

function MarkAllAsRead(){
    return (
        <div className = 'p-4 po-fixed bottom-0 m-4 right-0' style = {{zIndex: 9}}>
            <button className = 'border-0 bg-clear theme-bg row a-i-c j-c-space-between py-3 shadow-sm rounded-2x text-white'>
                <div className = 'col-auto'>
                    <Read />
                </div>
                <div className = 'col-auto'>
                    <p className = 'm-0 text-capitalize half-bold one-line'>mark all as read</p>
                </div>
            </button>
        </div>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {account_type}, resolvedUrl} = context
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

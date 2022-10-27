import {API} from '/config'
import {useEffect, useState} from 'react'
import {CircleIntersect} from '/components/svg'
import {ParseObjectToFormData} from '/functions'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {NotificationCard} from '/components/dashboard/NotificationCard'

export default function Index({account_type, jwt_token}){
    const [payments, setPayments] = useState([])

    useEffect(() => {
        fetch(API.hostel_owner.receipts, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({data}) => setPayments(data) || console.log(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>payments</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid'>
                    <div className = 'row mb-5'>
                        <div className = 'col-lg-9 mb-4'>
                            <div className = 'container-fluid p-4 bg-white shadow-sm rounded-2x'>
                                <div className = 'row mb-4 a-i-c j-c-space-between'>
                                    <div className = 'col-12'>
                                        <p className = 'm-0 bold text-capitalize'>receipts</p>
                                    </div>
                                </div>
                                <div className = 'row a-i-c j-c-space-between'>{
                                    (payments && payments.length > 0)
                                    ? payments.map(each => (
                                        <div className = 'col-12 mb-4' key = {each.id}>
                                            <ReceiptCard {...each} />
                                        </div>
                                    ))
                                    : (
                                        <div className = 'col-12 mb-4'>
                                            <div className = 'p-5 rounded-2x border text-center half-bold text-muted text-sentence'>You do not have any receipt.</div>
                                        </div>
                                    )
                                }</div>
                            </div>
                        </div>
                    </div>
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

function MyCard(){
    return (
        <div className = 'container-fluid mb-4 p-4 theme-bg shadow-sm rounded-2x'>
            <div className = 'row a-i-c j-c-space-between mb-6'>
                <div className = 'col-auto'>
                    <div className = 'text-capitalize half-bold text-white'>sally hostel</div>
                </div>
                <div className = 'col-auto'>
                    <CircleIntersect />
                </div>
            </div>
            <div className = 'row a-i-c j-c-space-between mb-3'>
                <div className = 'col-12'>
                    <div className = 'h4 text-capitalize text-white'>1234 5678 9123 XXXX</div>
                </div>
            </div>
            <div className = 'row a-i-c j-c-space-between'>
                <div className = 'col-auto'>
                    <div className = 'row'>
                        <div className = 'col-auto text-white'>
                            <div>VALID THRU</div>
                            <div>05 / 24</div>
                        </div>
                        <div className = 'col-auto text-white'>
                            <div>CVV</div>
                            <div>09X</div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .mb-6{
                    margin-bottom: 6rem;
                }
            `}</style>
        </div>
    )
}

function AddNewCard(){
    return (
        <div className = 'container-fluid mb-4 p-4 bg-white shadow-sm rounded-2x'>
            <div className = 'row mb-4 j-c-space-between'>
                <div className = 'col-auto'>
                    <p className = 'm-0 bold text-capitalize'>payment method</p>
                </div>
                <div className = 'col-auto'>
                    <button className = 'theme-bg border-0 shadow rounded-1x text-white px-4 py-3'>
                        Add new card
                    </button>
                </div>
            </div>
            <div className = 'row'>
                <div className = 'col-12 mb-4'>
                    <p className = 'mb-1 text-sentence'>card name</p>
                    <input placeholder = 'John Doe' className = 'border rounded-1x d-block w-100 bg-clear p-3' />
                </div>
                <div className = 'col-12 mb-4'>
                    <p className = 'mb-1 text-sentence'>card number</p>
                    <div className = 'container'>
                        <div className = 'border rounded-1x row a-i-c'>
                            <div className = 'col-auto pr-0'>
                                <MasterCardCircle />
                            </div>
                            <div className = 'col pl-0'>
                                <input placeholder = '1234 5678 9123 XXXX' className = 'border-0 outline-0 rounded-1x d-block w-100 bg-clear p-3' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'col-lg-6 mb-4'>
                    <p className = 'mb-1 text-sentence'>MM / YY</p>
                    <input placeholder = 'MM / YY' className = 'border rounded-1x d-block w-100 bg-clear p-3' />
                </div>
                <div className = 'col-lg-6 mb-4'>
                    <p className = 'mb-1 text-sentence'>CVV</p>
                    <input placeholder = 'CVV' className = 'border rounded-1x d-block w-100 bg-clear p-3' />
                </div>
            </div>
        </div>
    )
}

function Receipts({data}){
    return (
        <div className = 'container-fluid p-4 bg-white shadow-sm rounded-2x'>
            <div className = 'row mb-4 a-i-c j-c-space-between'>
                <div className = 'col-12'>
                    <p className = 'm-0 bold text-capitalize'>receipts</p>
                </div>
            </div>
            <div className = 'row a-i-c j-c-space-between'>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
            </div>
        </div>
    )
}

function ReceiptCard({timestamp, price, due_in, hostel_id, hostel_name, name, hostel_type, transaction_id}){
    const [seeMore, setSeeMore] = useState(false)

    return (
        <div className = 'theme-bg-light py-3 rounded-1x container-fluid'>
            <div className = 'row a-i-c'>
                <div className = 'col'>
                    <div className = 'bold mb-2 text-dark'>{new Date(timestamp).toDateString()} {new Date(timestamp).toLocaleTimeString()}</div>
                    <div className = 'half-bold text-muted'>REF:- {transaction_id}</div>
                </div>
                <div className = 'col-auto'>
                    <div className = 'half-bold text-muted'>N{new Intl.NumberFormat().format(due_in * price)}</div>
                </div>
                <div className = 'col-auto'>
                    <button onClick = {() => setSeeMore(!seeMore)} className = 'bg-clear border-0 half-bold theme-color text-capitalize p-1 underline'>see {seeMore ? 'less' : 'more'}</button>
                </div>
                <div className = {`${seeMore ? '' : 'd-none'} col-12 mt-3`}>
                    <div className = 'bg-clear border-0 half-bold theme-color text-capitalize p-1'>
                        <a href = {`./hostels/${hostel_id}`} className = 'underline'>{name || hostel_name}</a>
                        <span className = 'bi-box-arrow-up-right text-muted ml-2'></span>
                    </div>
                    <div className = 'bg-clear border-0 half-bold text-muted text-capitalize p-1'>{hostel_type}</div>
                    <div className = 'bg-clear border-0 half-bold text-muted text-capitalize p-1'>transaction {
                        (status === 0)
                        ? 'pending'
                        : (
                            (status === 1)
                            ? 'validated'
                            : 'unresolved'
                        )
                    }</div>
                </div>
            </div>
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

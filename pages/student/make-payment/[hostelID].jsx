import {API} from '/config'
import {Check} from '/components/svg'
import {useRouter} from 'next/router'
import {notify2} from '/components/popup'
import {useState, useEffect} from 'react'
import {ParseObjectToFormData} from '/functions'
import {JWTVerficationComponent} from '/components/jwt'
import Pages from '/components/pages/hostel-owner/hostels/new'
import PagesContext from '/contexts/pages/hostel-owner/hostels/new'
import {SplitPageComponent} from '/components/dashboard/SplitPageComponent'

export default function ChangePassword({jwt_token, hostel_id}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <SplitPageComponent
                title = 'Make payment for your desired hostel'
                subTitle = 'make transfer to the account details provided and enter transaction number for verification. Verification is not instantenous!'>
                <PageComponent jwt_token = {jwt_token} hostel_id = {hostel_id} />
            </SplitPageComponent>
        </JWTVerficationComponent>
    )
}

function PageComponent({jwt_token, hostel_id}){
    const {back} = useRouter()
    const [hostelPrice, setHostelPrice] = useState(0)
    const [hostelOwner, setHostelOwner] = useState()
    const [paymentData, setPaymentData] = useState({
        transactionID: '',
        duration: '',
        price_total: 0
    })

    useEffect(() => {
        fetch(API.student.get_hostel_data, {method: 'POST', body: ParseObjectToFormData({jwt_token, hostel_id})})
        .then(e => e.json())
        .then(({data: {price, owner_id}}) => {
            setHostelPrice(price)
            setHostelOwner(owner_id)
        })
    }, [])

    useEffect(() => {
        setPaymentData({
            ...paymentData,
            price_total: paymentData.duration * hostelPrice
        })
    }, [paymentData.duration, hostelPrice])

    return (
        <div className = 'rounded-2x shadow py-5 px-3 bg-white text-left'>
            <div className = 'container-fluid py-2'>
                <div className = 'row a-i-c mb-4'>
                    <div className = 'col-auto'>
                        <button onClick = {() => back()} className = 'border-0 bg-clear'>
                            <span className = 'bi-arrow-left-circle text-dark fo-s-20'></span>
                        </button>
                    </div>
                    <div className = 'col'>
                        <h4 className = 'text-dark m-0 bold'>Account details</h4>
                    </div>
                </div>
                <div className = 'row a-i-c mb-4'>
                    <div className = 'col-md-6 mb-4 user-select-0 disabled'>
                        <p className = 'half-bold mb-2'>Account name</p>
                        <input type = 'text' defaultValue = 'SALLY HOSTEL LIMITED' className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                    </div>
                    <div className = 'col-md-6 mb-4 user-select-0 disabled'>
                        <p className = 'half-bold mb-2'>Account number</p>
                        <input type = 'text' defaultValue = '647-6435-681' className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100 letter-spacing-1' />
                    </div>
                    <div className = 'col-12 mb-4 user-select-0 disabled'>
                        <p className = 'half-bold mb-2'>Account bank</p>
                        <input type = 'text' defaultValue = 'ZENITH BANK' className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                    </div>
                    <div className = 'col-12 mb-5 user-select-0 disabled'>
                        <p className = 'half-bold mb-2'>Price total (N)</p>
                        <input type = 'text' value = {new Intl.NumberFormat().format(paymentData.price_total)} readOnly = {true} className = 'p-3 half-bold letter-spacing-1 rounded-2x border bg-clear d-block w-100' />
                    </div>
                    <div className = 'col-12 mb-4 pt-4'>
                        <p className = 'half-bold mb-2'>Select rent duration</p>
                        <select value = {paymentData.duration} onChange = {e => setPaymentData({
                            ...paymentData,
                            duration: e.target.value
                        })} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100'>
                            <option>---</option>
                            <option value = '1'>1 year</option>
                            <option value = '2'>2 years</option>
                            <option value = '3'>3 years</option>
                            <option value = '4'>4 years</option>
                            <option value = '5'>5 years</option>
                        </select>
                    </div>
                    <div className = 'col-12 mb-4 pt-4'>
                        <p className = 'half-bold mb-2'>Enter transaction ID</p>
                        <input size = '16' type = 'text' placeholder = 'XXXX-XXXX-XXXX-XXXX' value = {paymentData.transactionID} onChange = {e => setPaymentData({
                            ...paymentData,
                            transactionID: e.target.value
                        })} autoFocus = {true} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                    </div>
                    <form onSubmit = {e => {
                        e.preventDefault()

                        fetch(API.student.register_payment, {method: 'POST', body: ParseObjectToFormData({
                            jwt_token,
                            hostel_id,
                            owner_id: hostelOwner,
                            transaction_id: paymentData.transactionID,
                            duration: paymentData.duration})
                        })
                        .then(e => e.json())
                        .then(({type, message}) => notify2({
                            type,
                            message,
                            onResponse: () => setPaymentData({
                                transactionID: '',
                                duration: '',
                                price_total: 0
                            }),
                            onSucceed: () => back()
                        }))
                    }} className = 'col-12'>
                        <button type = 'submit' className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>continue</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {hostelID}} = context
    console.log(hostelID)
    const cookie = cookies['SALLY_HOSTEL']

    if(!cookie) return {
        redirect: {
            destination: '/408'
        }
    }

    return {
        props: {jwt_token: cookie, hostel_id: hostelID}
    }
}

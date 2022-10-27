import {API, SERVER} from '/config'
import {ParseObjectToFormData} from '/functions'
import {useEffect, useState, Fragment} from 'react'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({jwt_token}){
    const [payments, setPayments] = useState()

    useEffect(() => {
        fetch(API.admin.payments, {method: 'POST', body: ParseObjectToFormData(jwt_token)})
        .then(e => e.json())
        .then(({data}) => setPayments(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {'admin'}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>Payments</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid'>
                    <div className = 'row'>
                        <div className = 'col-lg-10 overflow-x-auto'>
                            <div className = 'table-responsive-xl rounded-2x overflow-0 shadow-sm'>
                                <table className = 'table table-borderless m-0 table-hover table-striped'>
                                    <thead className = 'bg-dark text-white'>
                                        <tr className = 'bold'>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>S/N</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1'>from</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>to</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>for</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>amount</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>status</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>more</td>
                                        </tr>
                                    </thead>
                                    <tbody className = 'table-light'>{
                                        (payments && payments.length > 0)
                                        ? payments.map(({f_name, id, l_name, status, name, price, due_in}, index) => (
                                            <tr className = 'bold' key = {id}>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>{++index}</td>
                                                <td className = 'p-4 text-sentence letter-spacing-1'>{f_name} {l_name}</td>
                                                <td className = 'p-4 letter-spacing-1 text-center'>SALLY HOSTEL</td>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>'{name}' hostel</td>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>N{new Intl.NumberFormat().format(price * due_in)}</td>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>{status}</td>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>
                                                    <a href = {`./payments/${id}`}>
                                                        <span className = 'mr-3 underline'>see more</span>
                                                        <span className = 'bi-box-arrow-up-right'></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                        : (
                                            (payments && payments.length === 0)
                                            ? (
                                                <tr className = 'bold'>
                                                    <td colSpan = '7' className = 'p-4 text-sentence letter-spacing-1'>
                                                        <div className = 'p-5 text-center text-sentence text-dark half-bold'>List is empty!</div>
                                                    </td>
                                                </tr>
                                            )
                                            : (
                                                <tr className = 'bold'>
                                                    <td colSpan = '7' className = 'p-4 text-sentence letter-spacing-1'>
                                                        <div className = 'p-5 text-center text-sentence text-dark half-bold'>Loading...</div>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    }</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
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

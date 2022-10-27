import {API, SERVER} from '/config'
import {ParseObjectToFormData} from '/functions'
import {useEffect, useState, Fragment} from 'react'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({jwt_token}){
    const [users, setUsers] = useState()

    useEffect(() => {
        fetch(API.admin.users, {method: 'POST', body: ParseObjectToFormData(jwt_token)})
        .then(e => e.json())
        .then(({data}) => setUsers(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {'admin'}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>users</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid'>
                    <div className = 'row'>
                        <div className = 'col-12 overflow-x-auto'>
                            <div className = 'table-responsive-xl rounded-2x overflow-0 shadow-sm'>
                                <table className = 'table table-borderless m-0 table-hover table-striped'>
                                    <thead className = 'theme-bg text-white'>
                                        <tr className = 'bold'>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>S/N</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1'>name</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>email</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>phone</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>account type</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>status</td>
                                            <td className = 'p-4 text-sentence bold letter-spacing-1 text-center'>more</td>
                                        </tr>
                                    </thead>
                                    <tbody className = 'table-light'>{
                                        (users && users.length > 0)
                                        ? users.map(({f_name, id, l_name, email, phone, status, account_type}, index) => (
                                            <tr className = 'bold' key = {id}>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>{++index}</td>
                                                <td className = 'p-4 text-sentence letter-spacing-1'>{f_name} {l_name}</td>
                                                <td className = 'p-4 letter-spacing-1 text-center'>
                                                    <a className = 'underline' href = {`mailto://${email}`}>{email}</a>
                                                </td>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>
                                                    <a className = 'underline' href = {`tel://${phone}`}>{phone}</a>
                                                </td>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>{account_type.replace('_', ' ')}</td>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>{
                                                    (status == '0')
                                                    ? 'unverified'
                                                    : (
                                                        (status == '1')
                                                        ? 'verified'
                                                        : 'suspended'
                                                    )
                                                }</td>
                                                <td className = 'p-4 text-sentence letter-spacing-1 text-center'>
                                                    <a href = {`./users/${id}`}>
                                                        <span className = 'mr-3 underline'>see more</span>
                                                        <span className = 'bi-box-arrow-up-right'></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                        : (
                                            (users && users.length === 0)
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

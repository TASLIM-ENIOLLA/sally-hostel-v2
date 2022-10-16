import {useState, useEffect} from 'react'
import {LogoWhite, Logo} from '/components/svg'
import {FormField, Toggle, Button, Form} from '/components/form'
import {API} from '/config'
import {ParseObjectToFormData, CookieStore} from '/functions'
import {notify} from '/components/popup'

export default function Register({account_type}){
    const [formData, setFormData] = useState({
        account_type,
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
        password: '',
        c_password: ''
    })

    return (
        <section className = 'd-flex bg-light'>
            <div className = 'd-none d-lg-block col-4 bg-splash'>
                <div className = 'min-vh-100 d-flex flex-column j-c-c py-10'>
                    <div className = 'mx-auto'>
                        <LogoWhite />
                    </div>
                </div>
            </div>
            <div className = 'col vh-100 overflow-y-auto'>
                <div className = 'd-lg-none row a-i-c po-sticky top-0 left-0' style = {{zIndex: 10}}>
                    <div className = 'col-12 p-4 bg-white shadow'>
                        <Logo />
                    </div>
                </div>
                <div className = 'min-vh-100 d-flex flex-column j-c-c py-10'>
                    <Form onSubmit = {() => RegisterUser(formData).then(({message, payload, type}) => notify({
                        type: type === 'success' ? type : 'danger',
                        message: message,
                        onSucceed: () => CookieStore.setCookie({
                            name: 'SALLY_HOSTEL',
                            value: payload,
                            expires: (new Date().getTime() + (3600 * 1000 * 24 * 30)),
                            path: '/'
                        }).then(() => window.location = `./${formData.account_type.replace('_', '-')}`)
                    }))} className = 'bg-white rounded-2x shadow p-5 mx-auto w-100' style = {{maxWidth: '600px'}}>
                        <div className = 'row'>
                            <div className = 'col-12 mb-5'>
                                <h5 className = 'bold'>Register as a {(formData.account_type || '').replace('_', ' ')}</h5>
                            </div>
                            <div className = 'col-lg-6 mb-4'>
                                <FormField value = {formData.f_name} onChange = {e => setFormData({
                                    ...formData,
                                    f_name: e
                                })} placeholder = 'Enter your first name' title = 'First name' type = 'text' />
                            </div>
                            <div className = 'col-lg-6 mb-4'>
                                <FormField value = {formData.l_name} onChange = {e => setFormData({
                                    ...formData,
                                    l_name: e
                                })} placeholder = 'Enter your last name' title = 'Last name' type = 'text' />
                            </div>
                            <div className = 'col-lg-6 mb-4'>
                                <FormField value = {formData.email} onChange = {e => setFormData({
                                    ...formData,
                                    email: e
                                })} placeholder = 'Enter your email' title = 'Email address' type = 'email' />
                            </div>
                            <div className = 'col-lg-6 mb-4'>
                                <FormField value = {formData.phone} onChange = {e => setFormData({
                                    ...formData,
                                    phone: e
                                })} placeholder = 'Enter your phone number' title = 'Phone number' type = 'phone' />
                            </div>
                            <div className = 'col-lg-6 mb-4'>
                                <FormField value = {formData.password} onChange = {e => setFormData({
                                    ...formData,
                                    password: e
                                })} placeholder = 'Enter your password' title = 'Password' type = 'password' />
                            </div>
                            <div className = 'col-lg-6 mb-5'>
                                <FormField value = {formData.c_password} onChange = {e => setFormData({
                                    ...formData,
                                    c_password: e
                                })} placeholder = 'Re-enter your password' title = 'Confirm password' type = 'password' />
                            </div>
                            <div className = 'col-12 mb-4'>
                                <Button type = 'submit' className = 'mb-4' value = 'Register' />
                                <div className = 'text-muted'>
                                    Already have an account? <a className = 'theme-color underline' href = './login'>Login</a>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            <style jsx>{`
                .py-10{
                    padding-top: 6rem;
                    padding-bottom: 6rem;
                }
            `}</style>
        </section>
    )
}

async function RegisterUser(formData){
    return await fetch(API.register, {method: 'POST', body: ParseObjectToFormData(formData)})
    .then(e => e.json())
}

export function getServerSideProps(context){
    const {query: {account_type}} = context

    return {
        props: {account_type}
    }
}

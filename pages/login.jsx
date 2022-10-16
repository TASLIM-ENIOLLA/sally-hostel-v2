import {useState, useEffect} from 'react'
import {LogoWhite, Logo} from '/components/svg'
import {FormField, Toggle, Select, Button, Form} from '/components/form'
import {API} from '/config'
import {ParseObjectToFormData, CookieStore} from '/functions'
import {notify} from '/components/popup'

export default function Login(){
    const [formData, setFormData] = useState({
        account_type: '',
        email: '',
        password: ''
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
                    <Form onSubmit = {() => LoginUser(formData).then(({message, payload, type}) => notify({
                        type: type === 'success' ? type : 'danger',
                        message: message,
                        onSucceed: () => CookieStore.setCookie({
                            name: 'SALLY_HOSTEL',
                            value: payload,
                            expires: (new Date().getTime() + (3600 * 1000 * 24 * 30)),
                            path: '/'
                        }).then(() => window.location = `./${formData.account_type.replace('_', '-')}`)
                    }))} className = 'bg-white rounded-2x shadow p-5 mx-auto w-100' style = {{maxWidth: '450px'}}>
                        <div className = 'row'>
                            <div className = 'col-12 mb-5'>
                                <h5 className = 'bold'>Login</h5>
                            </div>
                            <div className = 'col-12 mb-4'>
                                <Select value = {formData.account_type} onChange = {e => setFormData({
                                    ...formData,
                                    account_type: e
                                })} placeholder = '---' title = 'Account type'>
                                    <option value = 'student'>Student</option>
                                    <option value = 'hostel_owner'>Hostel owner</option>
                                </Select>
                            </div>
                            <div className = 'col-12 mb-4'>
                                <FormField value = {formData.email} onChange = {e => setFormData({
                                    ...formData,
                                    email: e
                                })} placeholder = 'Enter your email' title = 'Email address' type = 'email' />
                            </div>
                            <div className = 'col-12 mb-5'>
                                <FormField value = {formData.password} onChange = {e => setFormData({
                                    ...formData,
                                    password: e
                                })} placeholder = 'Enter your password' title = 'Password' type = 'password' />
                            </div>
                            <div className = 'col-12 mb-4'>
                                <Button type = 'submit' className = 'mb-4' value = 'Login' />
                                <div className = 'text-muted'>
                                    Don't have an account? <a className = 'theme-color underline' href = './account-type'>Register</a>
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

async function LoginUser(formData){
    return await fetch(API.login, {method: 'POST', body: ParseObjectToFormData(formData)})
    .then(e => e.json())
}

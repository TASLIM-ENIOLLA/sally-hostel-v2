import {API} from '/config'
import {notify} from '/components/popup'
import {useState, useEffect} from 'react'
import {LogoWhite, Logo} from '/components/svg'
import {ParseObjectToFormData, CookieStore} from '/functions'
import {FormField, Toggle, Button, Form} from '/components/form'
import {SplitPageComponent} from '/components/dashboard/SplitPageComponent'

export default function Register({account_type}){
    return (
        <SplitPageComponent title = <LogoContainer />>
            <Component account_type = {account_type} />
        </SplitPageComponent>
    )
}

function Component({account_type}){
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
    )
}

function LogoContainer(){
    return (
        <div className = 'text-center'>
            <LogoWhite />
        </div>
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

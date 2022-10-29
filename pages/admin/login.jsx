import {API} from '/config'
import {notify2} from '/components/popup'
import {useState, useEffect} from 'react'
import {LogoWhite, Logo} from '/components/svg'
import {ParseObjectToFormData, CookieStore} from '/functions'
import {FormField, Toggle, Select, Button, Form} from '/components/form'
import {SplitPageComponent} from '/components/dashboard/SplitPageComponent'

export default function Login(){
    const [formData, setFormData] = useState({
        uid: '4556',
        password: '11111111'
    })

    return (
        <SplitPageComponent title = <LogoContainer />>
            <Form onSubmit = {() => LoginUser(formData).then(({message, payload, type}) => notify2({
                type: type === 'success' ? type : 'danger',
                message: message,
                onSucceed: () => CookieStore.setCookie({
                    name: 'SALLY_HOSTEL_ADMIN',
                    value: payload,
                    expires: (new Date().getTime() + (3600 * 1000 * 24 * 30)),
                    path: '/'
                }).then(() => window.location = `./dashboard`)
            }))} className = 'bg-white rounded-2x shadow p-5 mx-auto w-100' style = {{maxWidth: '450px'}}>
                <div className = 'row'>
                    <div className = 'col-12 mb-5'>
                        <h5 className = 'bold text-center'>Admin</h5>
                    </div>
                    <div className = 'col-12 mb-4'>
                        <FormField value = {formData.uid} onChange = {e => setFormData({
                            ...formData,
                            uid: e
                        })} placeholder = 'Enter your UID' title = 'User ID' type = 'text' />
                    </div>
                    <div className = 'col-12 mb-5'>
                        <FormField value = {formData.password} onChange = {e => setFormData({
                            ...formData,
                            password: e
                        })} placeholder = 'Enter your password' title = 'Password' type = 'password' />
                    </div>
                    <div className = 'col-12'>
                        <Button type = 'submit' className = 'mb-4' value = 'Login' />
                    </div>
                </div>
            </Form>
        </SplitPageComponent>
    )
}

function LogoContainer(){
    return (
        <div className = 'text-center'>
            <LogoWhite />
        </div>
    )
}

async function LoginUser(formData){
    return await fetch(API.admin.login, {method: 'POST', body: ParseObjectToFormData(formData)})
    .then(e => e.json())
}

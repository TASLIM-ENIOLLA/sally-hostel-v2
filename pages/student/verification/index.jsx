import {API} from '/config'
import {Check} from '/components/svg'
import {notify2} from '/components/popup'
import {useState, useEffect} from 'react'
import {ParseObjectToFormData} from '/functions'
import {JWTVerficationComponent} from '/components/jwt'
import Page from '/components/pages/hostel-owner/hostels/new/9'
import PagesContext from '/contexts/pages/hostel-owner/hostels/new'
import {SplitPageComponent} from '/components/dashboard/SplitPageComponent'

export default function New({jwt_token}){
    const PageComponent = Page.component
    const PageTitle = Page.title
    const PageSubTitle = Page.subTitle
    const PageFormValidation = Page.form_validation
    const [files, setFiles] = useState({
        jwt_token,
        course_form: null
    })

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <SplitPageComponent
                title = 'We need to verify your hostel.'
                subTitle = 'Kindly provide the necessary details in time to complete the verification.'>
                <div className = 'rounded-2x shadow py-5 px-3 bg-white text-left'>
                    <div className = 'container-fluid py-2'>
                        <div className = 'row a-i-c mb-4'>
                            <div className = 'col-12'>
                                <h4 className = 'text-dark m-0 bold'>Upload documents</h4>
                            </div>
                        </div>
                        <UploadComponent value = {files.course_form} title = 'Course form' onChange = {(file) => setFiles({
                            ...files,
                            course_form: file
                        })} />
                        <div className = 'row a-i-c my-4'>
                            <div className = 'col'>
                                <div className = 'text-sentence text-muted m-0 half-bold'>you can upload your document in the following formats: JPG, JPEG, PNG, PDF, not greater than 5MB.</div>
                            </div>
                        </div>
                        <div className = 'row a-i-c'>
                            <div className = 'col-auto'>
                                <button onClick = {() => {
                                    if(Object.values(files).includes(null)) notify2({
                                        type: 'danger',
                                        message: 'Course form has not been selected.'
                                    })
                                    else fetch(API.student.verify_user, {method: 'POST', body: ParseObjectToFormData(files)})
                                    .then(e => e.json())
                                    .then(({type, message}) => notify2({
                                        type,
                                        message,
                                        onSucceed: () => window.location = './'
                                    }))
                                }} className = 'underline-0 half-bold theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>upload documents</button>
                            </div>
                        </div>
                    </div>
                </div>
            </SplitPageComponent>
        </JWTVerficationComponent>
    )
}

function UploadComponent({title, value, onChange, multiple = false}){
    const [file, changeFile] = useState(value)

    useEffect(() => onChange(file), [file])

    return (
        <div className = 'row a-i-c j-c-space-between mb-3'>
            <div className = 'col-auto'>
                <div className = 'row a-i-c'>{
                    (file)
                    ? (
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                    )
                    : <></>
                }
                    <div className = 'col-auto'>
                        <div className = 'text-capitalize text-muted m-0 half-bold'>{title}</div>
                    </div>
                </div>
            </div>
            <div className = 'col-auto'>
                <label tabIndex = {0} className = 'cursor-pointer text-sentence theme-color underline m-0 half-bold'>
                    <span >select file</span>
                    <input onChange = {({target: {files}}) => {
                        changeFile(
                            (files && typeof files === 'object')
                            ? (
                                (!multiple)
                                ? files[0]
                                : files
                            )
                            : null
                        )
                    }} type = 'file' accept = '.jpg, .jpeg, .png, .pdf' hidden = {true} />
                </label>
            </div>
        </div>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(!cookie) return {
        redirect: {
            destination: '/408'
        }
    }

    return {
        props: {jwt_token: cookie}
    }
}

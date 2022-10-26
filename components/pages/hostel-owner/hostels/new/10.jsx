import {useContext, useEffect, useState} from 'react'
import {Check, Naira} from '/components/svg'
import PagesContext from '/contexts/pages/hostel-owner/hostels/new'

export default {
    component: () => {
        const {
            hostelData, updateHostelData, next, back, canBack, finish
        } = useContext(PagesContext)

        return (
            <div className = 'rounded-2x shadow py-5 px-3 bg-white text-left'>
                <div className = 'container-fluid py-2'>
                    <div className = 'row a-i-c mb-4'>
                        <div className = {`${canBack ? '' : 'd-none'} col-auto`}>
                            <button onClick = {() => back()} className = 'border-0 bg-clear'>
                                <span className = 'bi-arrow-left-circle text-dark fo-s-20'></span>
                            </button>
                        </div>
                        <div className = 'col'>
                            <h4 className = 'text-dark m-0 bold'>Upload documents</h4>
                        </div>
                    </div>
                    <UploadComponent value = {hostelData.national_ID} title = 'national ID' onChange = {(file) => updateHostelData({
                        national_ID: file
                    })} />
                    <UploadComponent value = {hostelData.drivers_licence} title = 'drivers licence' onChange = {(file) => updateHostelData({
                        drivers_licence: file
                    })} />
                    <UploadComponent value = {hostelData.passport} title = 'passport' onChange = {(file) => updateHostelData({
                        passport: file
                    })} />
                    <UploadComponent value = {hostelData.proof_of_ownership} title = 'proof of ownership' onChange = {(file) => updateHostelData({
                        proof_of_ownership: file
                    })} />
                    <div className = 'row a-i-c my-4'>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>you can upload your document in the following formats: JPG, JPEG, PNG, PDF, not greater than 5MB.</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button onClick = {() => next(
                                hostelData.national_ID,
                                hostelData.drivers_licence,
                                hostelData.passport,
                                hostelData.proof_of_ownership
                            )} className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>create hostel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    title: 'You need to verify your account.',
    subTitle: 'Kindly provide your student course form to complete the verification.',
    form_validation: (course_form) => {
        if([course_form].includes(null)) return {
            type: 'danger',
            message: 'You haven\'t selected any document.'
        }
        else return {
            type: 'success'
        }
    }
}

function UploadComponent({title, value, onChange, multiple = false}){
    const [file, changeFile] = useState(value)

    useEffect(() => onChange(file), [file])

    return (
        <div className = 'row a-i-c j-c-space-between mb-2'>
            <div className = 'col-auto'>
                <div className = 'row'>{
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
                <label tabIndex = {0} className = 'text-sentence theme-color underline m-0 half-bold'>
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

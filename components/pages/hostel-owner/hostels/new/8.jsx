import {useContext} from 'react'
import {notify2} from '/components/popup'
import {Check, Naira} from '/components/svg'
import PagesContext from '/contexts/pages/hostel-owner/hostels/new'

export default {
    component: () => {
        const {
            hostelData, updateHostelData, next, back, canBack
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
                            <h4 className = 'text-dark m-0 bold'>Photos</h4>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <label className = 'underline-0 m-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>
                                <span>upload photos</span>
                                <input multiple = {true} onChange = {(e) => {
                                    const filesList = Object.values(e.target.files)
                                    if(filesList.length > 10){

                                        filesList.length = 10
                                        notify2({
                                            type: 'warning',
                                            message: 'Only a maximum of 10 files can be allowed.'
                                        })
                                    }

                                    updateHostelData({
                                        'photos[]': [...filesList]
                                    })
                                }} type = 'file' hidden = {true} />
                            </label>
                        </div>
                    </div>{(
                        (hostelData && hostelData['photos[]'].length > 0)
                        ? (
                            <div className = 'mb-4'>{
                                hostelData['photos[]'].map(({name}, index) => (
                                    <div className = 'row a-i-c mb-2' key = {`${new Date().getTime()}-${index}`}>
                                        <div className = 'col-auto'>
                                            <Check />
                                        </div>
                                        <div className = 'col'>
                                            <div className = 'text-sentence underline text-muted m-0 half-bold one-line'>{name}</div>
                                        </div>
                                    </div>
                                ))
                            }</div>
                        )
                        : (
                            <div className = 'row a-i-c mb-5'>
                                <div className = 'col'>
                                    <div className = 'text-sentence text-muted m-0 half-bold'>you can just use a smartphone or a digital camera here to get the job done</div>
                                </div>
                            </div>
                        )
                    )}
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button onClick = {() => next(hostelData['photos[]'])} className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>continue</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    title: 'What does your hostel look like?',
    subTitle: 'Add at least on photo. You can always come to add more later.',
    form_validation: (photos) => {
        if(!photos) return {
            type: 'danger',
            message: 'You haven\'t selected any photo.'
        }
        else if(photos.length > 10) return {
            type: 'danger',
            message: 'Too many photos selected, max. of 10 photos.'
        }
        else if(photos.length < 1) return {
            type: 'danger',
            message: 'No photo selected, max. of 10 photos.'
        }
        else return {
            type: 'success'
        }
    }
}

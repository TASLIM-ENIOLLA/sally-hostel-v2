import {useContext} from 'react'
import {Check} from '/components/svg'
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
                            <h4 className = 'text-dark m-0 bold'>Hostel type &amp; description</h4>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <select value = {hostelData.type} onChange = {(e) => updateHostelData({
                                type: e.target.value
                            })} autoFocus = {true} className = 'p-3 half-bold rounded-2x text-capitalize border bg-clear d-block w-100'>
                                <option value = ''>---</option>
                                <option value = '1_ROOM'>1 room</option>
                                <option value = 'SELF_CON'>self contain</option>
                                <option value = '2_BD_FLAT'>2 bedroom flat</option>
                                <option value = '3_BD_FLAT'>3 bedroom flat</option>
                            </select>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <textarea value = {hostelData.description} onChange = {(e) => updateHostelData({
                                description: e.target.value
                            })} placeholder = 'A very lucrative hostel' rows = '5' className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100 resize-0'></textarea>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-3'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>keep it short &amp; simple</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>be specific</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button onClick = {() => next(hostelData.type, hostelData.description)} className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>continue</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    title: 'Type & description',
    subTitle: 'The type of hostel you are listing. Description is the catchy line after the name.',
    form_validation: (type, description) => {
        if(type === '') return {
            type: 'danger',
            message: 'You have not selected an hostel type.'
        }
        else if(description === '') return {
            type: 'danger',
            message: 'Hostel description is empty.'
        }
        else if(description.length > 255) return {
            type: 'danger',
            message: 'Hostel description too long, max. of 255 letters.'
        }
        else return {
            type: 'success'
        }
    }
}

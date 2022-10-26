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
                            <h4 className = 'text-dark m-0 bold'>Hostel name</h4>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <input value = {hostelData.name} onChange = {(e) => updateHostelData({
                                name: e.target.value
                            })} placeholder = 'Sally Hostels' autoFocus = {true} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>keep it short &amp; catchy</div>
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
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>avoid abbreviations</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button onClick = {() => next(hostelData.name)} className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>continue</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    title: 'What\'s the name of your hostel?',
    subTitle: 'This is the name that will appear as the title of your listing on our site.',
    form_validation: (form_value) => {
        if(form_value.length < 1) return {
            type: 'danger',
            message: 'Hostel name is empty.'
        }
        else if(form_value.length > 100) return {
            type: 'danger',
            message: 'Hostel name too long, max. of 100 letters.'
        }
        else if(!/^[a-zA-Z\s\-]{1,}$/.test(form_value)) return {
            type: 'danger',
            message: 'Hostel name contains unwanted characters.'
        }
        else return {
            type: 'success'
        }
    }
}

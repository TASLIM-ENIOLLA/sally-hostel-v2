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
                            <h4 className = 'text-dark m-0 bold'>Hostel address</h4>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <input value = {hostelData.address} onChange = {(e) => updateHostelData({
                                address: e.target.value
                            })} placeholder = '5007 moore motorway' autoFocus = {true} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>enter street name and house number</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>spell street name correctly</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button onClick = {() => next(hostelData.address)} className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>continue</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    title: 'Where is your hostel located?',
    subTitle: 'Once a customer books your hostel, that\'s the address that will be shared with them.',
    form_validation: (address) => {
        if(address.length < 1) return {
            type: 'danger',
            message: 'Hostel address can\'t be empty.'
        }
        else if(address.length > 255) return {
            type: 'danger',
            message: 'Hostel address too long, max. of 255 letters.'
        }
        else return {
            type: 'success'
        }
    }
}

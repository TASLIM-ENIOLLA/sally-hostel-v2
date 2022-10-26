import {useContext} from 'react'
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
                            <h4 className = 'text-dark m-0 bold'>Vacant apartments</h4>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <input type = '' value = {new Intl.NumberFormat().format(hostelData.vacant_apartments)} onChange = {({target: {value}}) => {
                                const number = value.replace(/[^0-9]/g, '')

                                if(number.length <= 4) updateHostelData({
                                    vacant_apartments: Number(number)
                                })
                            }} placeholder = '' autoFocus = {true} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>lets help yuo keep track of how many apartments you have left.</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button onClick = {() => next(hostelData.vacant_apartments)} className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>continue</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    title: 'How many vacant apartments are available for lease?',
    subTitle: 'We need to help you keep track of your apartments so you won\'t worry much.',
    form_validation: (vacant_apartments) => {
        if(vacant_apartments === 0) return {
            type: 'danger',
            message: 'Number of vacant apartments can\'t be zero.'
        }
        else if(!Number(vacant_apartments)) return {
            type: 'danger',
            message: 'Invalid input.'
        }
        else if(vacant_apartments > 9999) return {
            type: 'danger',
            message: 'Maximum range of 9,999 exceeded.'
        }
        else return {
            type: 'success'
        }
    }
}

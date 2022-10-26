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
                            <h4 className = 'text-dark m-0 bold'>Price (<Naira />) per annum</h4>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <input type = '' value = {new Intl.NumberFormat().format(hostelData.price)} onChange = {({target: {value}}) => {
                                const number = value.replace(/[^0-9]/g, '')

                                updateHostelData({
                                    price: number
                                })
                            }} placeholder = 'XX,XXX' autoFocus = {true} className = 'p-3 half-bold rounded-2x border bg-clear d-block w-100' />
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>you can always change this later in the settings so feel free.</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button onClick = {() => next(hostelData.price)} className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>continue</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    title: 'How much do you want to charge?',
    subTitle: 'The price you would want our customers to book your hostel per room or apartment.',
    form_validation: (price) => {
        if(price === 0) return {
            type: 'danger',
            message: 'You have not entered a valid price.'
        }
        else if(!/\d+/.test(price)) return {
            type: 'danger',
            message: 'Hostel price contains unacceptable characters.'
        }
        else if(price.length > 11) return {
            type: 'danger',
            message: 'Hostel price has exceeded maximum range.'
        }
        else return {
            type: 'success'
        }
    }
}

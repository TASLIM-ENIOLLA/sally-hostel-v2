import {useContext, useEffect} from 'react'
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
                            <button className = 'border-0 bg-clear'>
                                <span className = 'bi-arrow-left-circle text-dark fo-s-20'></span>
                            </button>
                        </div>
                        <div className = 'col'>
                            <h4 className = 'text-dark m-0 bold'>Create new listing</h4>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>listing is totally free</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>24/7 customer support</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col-auto'>
                            <Check />
                        </div>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>set rules on property</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <div className = 'text-sentence text-muted m-0 half-bold'>by continuing, you agree to let sally hostels email you regarding your property registration.</div>
                        </div>
                    </div>
                    <div className = 'row a-i-c'>
                        <div className = 'col-auto'>
                            <button onClick = {() => next()} className = 'underline-0 theme-bg px-5 py-3 rounded-1x text-white border-0 text-capitalize'>get started</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    title: 'Hello, list you hostels on Sally Hostels',
    subTitle: 'Registration can take as little as 15 minutes to complete - get started today',
    form_validation: () => ({type: 'success'})
}

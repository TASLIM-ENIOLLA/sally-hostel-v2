import {useContext, useState, useEffect, useRef} from 'react'
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
                            <h4 className = 'text-dark m-0 bold'>Features</h4>
                        </div>
                    </div>
                    <div className = 'row a-i-c mb-4'>
                        <div className = 'col'>
                            <ListComponent onChange = {(list) => updateHostelData({
                                features: list
                            })} value = {hostelData.features} />
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
    title: 'What is special about your apartment?',
    subTitle: 'State some features that makes your apartment stand out',
    form_validation: (features) => {
        if(features.length < 1) return {
            type: 'danger',
            message: 'Feature list cannot be empty.'
        }
        else return {
            type: 'success'
        }
    }
}

function ListItem({content, onClick}){
    const elementRef = useRef()

    useEffect(() => elementRef.current.scrollIntoView({behavior: 'smooth'}), [])

    return (
        <div ref = {elementRef} onClick = {() => typeof onClick === 'function' ? onClick() : false} className = 'd-inline-block p-3 cursor-pointer user-select-0 mr-3 mb-3 half-bold bg-light rounded-2x shadow-sm border text-dark text-sentence break-word'>{content}</div>
    )
}

function ListComponent({onChange, value}){
    const [list, setList] = useState(value)
    const [currentList, setCurrentList] = useState('')

    useEffect(() => typeof onChange === 'function' ? onChange(list) : undefined, [list])

    return (
        <div className = 'rounded-2x d-flex flex-column border overflow-0'>
            <div className = 'p-3 flex-1 overflow-y-auto' style = {{minHeight: '120px', maxHeight: '200px'}}>{
                list.map((content, index) => (
                    <ListItem key = {index} onClick = {() => setList(list.filter(each => each !== content))} content = {content} />
                ))
            }</div>
            <div className = 'container-fluid bg-light border-top'>
                <form onSubmit = {(e) => (
                    e.preventDefault(), setList([...list, currentList]), setCurrentList('')
                )} className = 'row'>
                    <div className = 'col h-100 px-0'>
                        <input autoFocus = {true} value = {currentList} onChange = {({target: {value}}) => setCurrentList(value)} placeholder = 'Type here...' className = 'p-3 border-0 outline-0 d-block w-100 bg-clear' />
                    </div>
                    <div className = 'col-auto h-100 px-0'>
                        <button className = 'py-3 px-4 text-capitalize theme-bg text-white half-bold border-0 outline-0'>add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

import {useState, useEffect} from 'react'

export function FormField({className, title, type, placeholder, value, onChange}){
    const [formValue, setFormValue] = useState(value)

    useEffect(() => typeof onChange === 'function' ? onChange(formValue) : 0, [value, formValue])

    return (
        <div className = {`${className}`}>
            <div className = 'flex-1 text-dark half-bold'>{title || 'radio button'}</div>
            <div className = 'pt-1'>
                <input value = {value} onChange = {(e) => setFormValue(e.target.value)} placeholder = {placeholder} type = {type} className = 'd-block half-bold w-100 p-3 border rounded-2x' />
            </div>
        </div>
    )
}

export function Select({className, children, title, type, placeholder, value, onChange}){
    const [formValue, setFormValue] = useState(value)

    useEffect(() => typeof onChange === 'function' ? onChange(formValue) : 0, [value, formValue])

    return (
        <div className = {`${className}`}>
            <div className = 'flex-1 text-dark half-bold'>{title || 'select'}</div>
            <div className = 'pt-1'>
                <select value = {value} onChange = {(e) => setFormValue(e.target.value)} placeholder = {placeholder} className = 'd-block half-bold w-100 p-3 border rounded-2x'>
                    {placeholder ? (
                        <option value = ''>{placeholder}</option>
                    ) : false}
                    {children}
                </select>
            </div>
        </div>
    )
}

export function Toggle({title, className, value, onChange}){
    const [active, setActive] = useState(value)

    useEffect(() => typeof onChange === 'function' ? onChange(active) : 0, [value, active])

    return (
        <div className = {`row a-i-c ${className}`}>
            <div className = 'col-auto'>
                <button type = 'button' onClick = {(e) => e.preventDefault() || setActive(!active)} className = {`bg-clear border-0 cursor-pointer fa-2x transit bi-toggle-${active ? 'on theme-color' : 'off text-muted'}`}></button>
            </div>
            <div className = 'col text-dark'>
                <span onClick = {() => setActive(!active)} className = 'cursor-pointer one-line'>{title || 'toggle button'}</span>
            </div>
        </div>
    )
}

export function Button({value, className, type = 'button', onClick}){
    return (
        <div className = {`row ${className}`}>
            <div className = 'col-auto'>
                <button type = {type} onClick = {onClick} className = 'px-5 py-3 theme-bg border-0 shadow rounded-2x text-white'>{value || 'button'}</button>
            </div>
        </div>
    )
}

export function Form({children, onSubmit, ...otherProps}){
    return (
        <form onSubmit = {e => e.preventDefault() || onSubmit()} {...otherProps}>
            {children}
        </form>
    )
}

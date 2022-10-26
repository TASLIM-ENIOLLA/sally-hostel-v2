import {LogoWhite} from '/components/svg'
import {SplitPageComponent} from '/components/dashboard/SplitPageComponent'

export default function AccountType(){
    return (
        <SplitPageComponent title = <LogoContainer />>
            <div className = 'bg-white rounded-2x shadow p-5 mx-auto w-100' style = {{maxWidth: '450px'}}>
                <h5 className = 'bold text-capitalize mb-5'>choose account type</h5>
                <RadioButton href = './register?account_type=student' title = 'Student' className = 'mb-4' />
                <RadioButton href = './register?account_type=hostel_owner' title = 'Hostel owner' className = 'mb-4' />
                <div className = 'text-muted'>
                    Already have an account? <a className = 'theme-color underline' href = './login'>Login</a>
                </div>
            </div>
        </SplitPageComponent>
    )
}

function LogoContainer(){
    return (
        <div className = 'text-center'>
            <LogoWhite />
        </div>
    )
}

function RadioButton({className, href = '', title}){
    return (
        <a href = {href} className = {`d-flex cursor-pointer border rounded-2x underline-0 a-i-c p-2 ${className}`}>
            <div className = 'flex-1 p-2 text-dark'>
                <span className = 'one-line half-bold'>{title || 'radio button'}</span>
            </div>
            <div className = 'p-2'>
                <span className = 'bi-box-arrow-up-right text-muted'></span>
            </div>
        </a>
    )
}

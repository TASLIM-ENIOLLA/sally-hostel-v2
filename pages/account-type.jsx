import {LogoWhite} from '/components/svg'

export default function AccountType(){
    return (
        <section className = 'd-flex bg-light'>
            <div className = 'd-none d-md-block col-4 bg-splash'>
                <div className = 'min-vh-100 d-flex flex-column j-c-c py-10'>
                    <div className = 'mx-auto'>
                        <LogoWhite />
                    </div>
                </div>
            </div>
            <div className = 'col overflow-y-auto'>
                <div className = 'min-vh-100 d-flex flex-column j-c-c py-10'>
                    <div className = 'bg-white rounded-2x shadow p-5 mx-auto w-100' style = {{maxWidth: '450px'}}>
                        <h5 className = 'bold text-capitalize mb-5'>choose account type</h5>
                        <RadioButton href = './register?account_type=student' title = 'Student' className = 'mb-4' />
                        <RadioButton href = './register?account_type=hostel_owner' title = 'Hostel owner' className = 'mb-4' />
                        <div className = 'text-muted'>
                            Already have an account? <a className = 'theme-color underline' href = './login'>Login</a>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .py-10{
                    padding-top: 6rem;
                    padding-bottom: 6rem;
                }
            `}</style>
        </section>
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

import {LogoWhite} from '/components/svg'

export default function Index(){
    return (
        <section className = 'overflow-y-auto bg-splash'>
            <div className = 'min-vh-100 j-c-c py-5 d-flex flex-column'>
                <div className = 'container-fluid pb-5'>
                    <div className = 'row j-c-c'>
                        <div className = 'col-auto'>
                            <LogoWhite />
                        </div>
                    </div>
                </div>
                <div className = 'container-fluid'>
                    <div className = 'row j-c-c'>
                        <div className = 'col-auto mb-2'>
                            <a href = './account-type' className = 'underline-0 bg-white get-started-btn text-uppercase theme-color px-5 py-3 rounded-30px d-inline-block'>get started</a>
                        </div>
                        <div className = 'col-auto mb-2'>
                            <a href = './login' className = 'underline-0 login-btn bg-clear text-uppercase text-white px-5 py-3 rounded-30px d-inline-block'>log in</a>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .rounded-30px{border-radius: 30px;}
                .login-btn{border: 2px solid var(--white)}
                .get-started-btn{border: 2px solid var(--white)}
            `}</style>
        </section>
    )
}

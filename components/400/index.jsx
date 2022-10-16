import {CookieStore} from '/functions'

export const Component409 = () => {
    return (
        <section className = 'container'>
            <div className = 'row min-vh-100 j-c-c a-i-c py-5'>
                <div className = 'col-auto'>
                    <div className = 'row a-i-c j-c-c'>
                        <div className = 'col-auto py-3 border-dark border-sm-right'>
                            <h1 className = 'm-0'>409</h1>
                        </div>
                        <div className = 'col-12 col-sm-auto'>
                            <h5 className = 'm-0 text-sentence text-center'>failed to authenticate your ID. Try <a style = {{fontSize: 'inherit'}} className = 'underline' href = '/login' onClick = {(e) => {
                                e.preventDefault()

                                CookieStore.removeCookie('SALLY_HOSTEL').then(() => window.location = e.target.href)
                            }}>logging in.</a></h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const Component408 = () => {
    return (
        <section className = 'container'>
            <div className = 'row min-vh-100 j-c-c a-i-c py-5'>
                <div className = 'col-auto'>
                    <div className = 'row a-i-c j-c-c'>
                        <div className = 'col-auto py-3 border-dark border-sm-right'>
                            <h1 className = 'm-0'>408</h1>
                        </div>
                        <div className = 'col-12 col-sm-auto'>
                            <h5 className = 'm-0 text-sentence text-center'>Access to this page has been denied. Try <a style = {{fontSize: 'inherit'}} className = 'underline' href = '/login' onClick = {(e) => {
                                e.preventDefault()

                                CookieStore.removeCookie('SALLY_HOSTEL').then(() => window.location = e.target.href)
                            }}>logging in.</a></h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

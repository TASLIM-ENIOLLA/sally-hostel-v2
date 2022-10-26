export const SplitPageComponent = ({title, subTitle, children}) => {
    return (
        <section className = 'container-fluid'>
            <div className = 'row vh-100'>
                <div className = 'col-12 col-md-6 col-lg-5 col-xl-4 h-100 bg-banner overflow-y-auto'>
                    <div className = 'min-h-100 d-flex flex-column j-c-c px-4 py-5'>
                        <div>
                            <div>
                                <h1 className = 'text-sentence text-center text-md-left fa-3x half-bold text-white mb-4'>{title}</h1>
                                <p className = 'text-sentence text-center text-md-left text-white fo-s-16 m-0'>{subTitle}</p>
                            </div>
                            <div className = 'd-md-none pt-5'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'd-none d-md-block col-md h-100 bg-light overflow-y-auto'>
                    <div className = 'min-h-100 d-flex flex-column j-c-c py-5'>
                        <div className = 'mx-auto max-width-500px w-100'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .max-width-500px{
                    max-width: 500px;
                }
                .min-h-100{
                    min-height: 100%;
                }
                .bg-banner{
                    background: linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.3)), url(/images/Splash-bg.png);
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </section>
    )
}

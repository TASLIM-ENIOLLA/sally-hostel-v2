import {useRouter} from 'next/router'
import {Logo} from '/components/svg'
import {URL} from '/data'

export default function DashboardTemplate({account_type, children}){
    const {asPath} = useRouter()
    const url = URL[account_type]

    return (
        <section>
            <div className = 'd-flex bg-light'>
                <div className = 'd-none d-md-block min-width-230px bg-white border-right p-0'>
                    <div className = 'vh-100 overflow-y-auto'>
                        <div className = 'py-5'>
                            <div className = 'text-center mb-5'>
                                <span>
                                    <Logo />
                                </span>
                            </div>
                            <div className = 'container-fluid pt-4'>{
                                url.map(({name, href, Icon}) => (
                                    <a key = {href} href = {href} className = {`${asPath === href ? 'theme-color theme-bg-light' : 'text-muted'} row underline-0 a-i-c mb-4 border-0 rounded-2x py-3 w-100 m-0`}>
                                        <span className = 'col-auto'>
                                            <Icon />
                                        </span>
                                        <span className = 'col text-left p-0'>
                                            <span className = 'text-capitalize one-line'>{name}</span>
                                        </span>
                                    </a>
                                ))
                            }</div>
                        </div>
                    </div>
                </div>
                <div className = 'col p-0'>
                    <div className = 'vh-100 overflow-y-auto po-rel'>
                        <div className = 'd-md-none'>
                            <div className = 'container-fluid po-sticky top-0 left-0 py-3 w-100 shadow border-bottom'>
                                <div className = 'row j-c-space-between a-i-c'>
                                    <div className = 'col-auto'>
                                        <Logo />
                                    </div>
                                    <div className = 'col-auto'>
                                        <button className = 'bg-clear border-0 rounded-1x px-2'>
                                            <span className = 'bi-border-width fa-2x text-dark'></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .min-width-230px{
                    width: 230px;
                }
                .shadow-left{
                    box-shadow: 3px -1rem 1rem 2px #efefef;
                }
            `}</style>
        </section>
    )
}

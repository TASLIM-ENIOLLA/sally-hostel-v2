import ReactDOM from 'react-dom'
import {useState, useEffect} from 'react'

let Z_INDEX = 1000

export const notify = ({message = '', onReady, callback, onSucceed, type = 'light', duration = 3500}) => {
    const Notify = () => {
        const [doubleLine, setDoubleLine] = useState(true)
        const id = `_notify_`

        useEffect(() => {
            typeof onReady === 'function' ? onReady() : false;

            setTimeout(() => {
                typeof callback === 'function' ? callback(type) : false;
                typeof onSucceed === 'function' && type === 'success' ? onSucceed(type) : false;

                ReactDOM.unmountComponentAtNode(
                    document.querySelector(`#__popup`)
                )
            }, duration);
        }, [])

        return (
            <div id = {id} className = 'p-5 po-fixed bottom-0 left-0 w-100' style = {{zIndex: Z_INDEX += 10}}>
                <div className = {`animated bg-${type}-light slideInRight a-i-c p-2 rounded-1x shadow ml-auto flex-h`} style = {{maxWidth: '500px'}}>
                    <div className = {`px-4 py-3 border-white h-100 border-right`}>
                        <span className = {`bi fo-s-22 bi-${type === 'success' ? 'check-circle-fill' : type === 'danger' ? 'exclamation-triangle-fill' : 'exclamation-circle-fill'} text-white`}></span>
                    </div>
                    <div className="flex-1 py-4">
                        <div onClick = {() => setDoubleLine(!doubleLine)} className={`${!doubleLine ? '' : 'double-line'} my-2 text-white fo-s-15 bold h-100 flex-v j-c-c px-4`}>
                            {message}
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .bg-danger-light{
                        background: #ff5555;
                    }
                    .text-danger-dark{
                        color: #be0f0f;
                    }
                    .bg-success-light{
                        background: #42cb65;
                    }
                    .text-success-dark{
                        color: #0fbe2b;
                    }
                    .bg-notify-light{
                        background: #f8f9fa;
                    }
                    .text-notify-dark{
                        color: #343a40;
                    }
                `}</style>
            </div>
        )
    }

    if(!document.querySelector('#_notify_')){
        ReactDOM.render(
            <Notify />,
            document.querySelector('#__popup')
        )
    }
}

function Notify2({message, type = 'primary', duration = 3500, onResponse, onFail, onSucceed}){
    const [iconName, setIconName] = useState('info-circle-fill')
    const iconTypeAndName = {
        success: 'chat-left-dots-fill',
        danger: 'exclamation-triangle-fill',
        warning: 'exclamation-diamond-fill',
        primary: 'envelope-fill'
    }

    useEffect(() => {
        if(typeof onResponse === 'function') onResponse()
        setTimeout(() => {
            if(typeof onSucceed === 'function' && type === 'success') onSucceed()
            if(typeof onFail === 'function' && type !== 'success') onFail()
            ReactDOM.unmountComponentAtNode(
                document.querySelector(`#__popup`)
            )
        }, duration)
    }, [])

    return (
        <section className = 'animated bounceIn po-fixed bottom-5pcent left-0 w-100'>
            <div className = 'container-fluid'>
                <div className = 'row'>
                    <div className = 'col-lg-5 col-md-7 col-sm-10 col-11 col-xl-5 mx-auto'>
                        <div className = 'row bg-dark rounded-2x a-i-c shadow overflow-0'>
                            <div className = 'col-12'>
                                <div className = 'row py-4 a-i-c'>
                                    <div className = 'col-auto'>
                                        <span className = {`bi-${iconTypeAndName[type]} fa-2x text-${type}`}></span>
                                    </div>
                                    <div className = 'col overflow-y-auto max-height-30pcent'>
                                        <p className = 'm-0 text-sentence half-bold text-white break-word'>{message}</p>
                                    </div>
                                </div>
                            </div>
                            <div className = 'col-12 px-0'>
                                <div className = {`reduce bg-${type} py-1`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes reduce{
                    from{width: 100%}
                    to{width: 0%}
                }
                .reduce{
                    animation: reduce ${duration / 1000}s ease-in-out;
                }
                .break-word{
                    word-break: break-word;
                }
                .bottom-5pcent{
                    bottom: 5%;
                }
                .max-height-30pcent{
                    max-height: 30%;
                }
            `}</style>
        </section>
    )
}

export const notify2 = (props) => {
    if(!document.querySelector('#_notify_')){
        ReactDOM.render(
            <Notify2 {...props} />,
            document.querySelector('#__popup')
        )
    }
}

import {SERVER, API} from '/config'
import {notify2} from '/components/popup'
import {Heart, Map} from '/components/svg'
import {useState, useEffect} from 'react'
import {ParseObjectToFormData} from '/functions'

const hostelURL = new URL('student/hostels/', SERVER.FRONTEND.URL).href
const hostelImageURL = new URL('images/hostel-owner/', SERVER.BACKEND.URL).href

export const HostelCard = ({id, name, address, favourite, jwt_token, photos, price, owner_id, onStateChange, ...restProps}) => {
    const [isFavourite, setIsFavourite] = useState(favourite)

    useEffect(() => {
        if(typeof onStateChange === 'function') onStateChange(isFavourite)
    }, [isFavourite])

    return (
        <div className = 'container-fluid py-3 bg-white shadow-sm rounded-2x'>
            <div onClick = {() => window.location = `${hostelURL}${id}`} className = {`hostel-img-${id} rounded-2x bg-light mb-3`}></div>
            <div className = 'row j-c-space-between a-i-c mb-3'>
                <div className = 'col-auto'>
                    <p className = 'half-bold one-line text-dark text-capitalize m-0'>
                        <a href = {`${hostelURL}${id}`}>{name}</a>
                    </p>
                </div>
                <div className = 'col-auto'>
                    <button onClick = {() => {
                        fetch(API.student[(isFavourite ? 'remove_from_favourites' : 'add_to_favourites')], {method: 'POST', body: ParseObjectToFormData({hostel_id: id, jwt_token})})
                        .then(e => e.json())
                        .then(({message, type}) => notify2({type, message, onResponse: () => setIsFavourite(type === 'success' ? !isFavourite : isFavourite)}))
                    }} className = {`${isFavourite ? 'text-danger' : 'text-muted'} transit border-0 bg-clear p-1`}>
                        <Heart />
                    </button>
                </div>
            </div>
            <div className = 'row a-i-c mb-3'>
                <div className = 'col-auto'>
                    <button className = 'border-0 bg-clear p-1'>
                        <Map />
                    </button>
                </div>
                <div className = 'col pl-0'>
                    <p className = 'one-line half-bold text-dark text-capitalize m-0'>{address}</p>
                </div>
            </div>
            <div className = 'row a-i-c'>
                <div className = 'col-auto'>
                    <p className = 'border-0 bg-clear half-bold theme-color m-0'>N{new Intl.NumberFormat().format(price)}</p>
                </div>
            </div>
            <style>{`
                .hostel-img-${id}{
                    min-height: 120px;
                    background-image: linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)), url(${hostelImageURL}${owner_id}/${id}/${photos[0]});
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </div>
    )
}

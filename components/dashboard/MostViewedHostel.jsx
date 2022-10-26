import {SERVER, API} from '/config'
import {useState, useEffect} from 'react'
import {ParseObjectToFormData} from '/functions'

const hostelURL = new URL('student/hostels/', SERVER.FRONTEND.URL).href
const hostelImageURL = new URL('images/hostel-owner/', SERVER.BACKEND.URL).href

export const MostViewedHostel = ({jwt_token}) => {
    const [mostViewedHostel, setMostViewedHostel] = useState()
    const {id, name, address, favourite, photos, price, description, owner_id} = mostViewedHostel ? mostViewedHostel : {}

    useEffect(() => {
        fetch(API.student.most_viewed_hostel, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({data}) => setMostViewedHostel(data))
    }, [])

    return (
        <div className = 'px-4 py-5 mt-5 po-sticky top-5pcent theme-bg rounded-2x'>
            <h5 className = 'text-capitalize text-white half-bold mb-5'>your hostel</h5>
            <p className = 'text-capitalize text-white half-bold mb-4'>{name}</p>
            <div className = 'rounded-2x shadow-sm favourite-hostel mb-4' style = {{
                backgroundImage: (
                    (mostViewedHostel)
                    ? `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2)), url(${hostelImageURL}${owner_id}/${id}/${photos[0]})`
                    : ''
                )
            }}></div>
            <div className = 'mb-4'>
                <p className = 'text-capitalize text-white half-bold mb-2'>features</p>
                <div>
                    <div className = 'px-3 mr-3 d-inline-block mb-3 py-2 bg-warning text-dark text-sentence rounded-2x shadow-sm'>lorem</div>
                    <div className = 'px-3 mr-3 d-inline-block mb-3 py-2 bg-warning text-dark text-sentence rounded-2x shadow-sm'>ipsum</div>
                    <div className = 'px-3 mr-3 d-inline-block mb-3 py-2 bg-warning text-dark text-sentence rounded-2x shadow-sm'>dolor</div>
                </div>
            </div>
            <div>
                <p className = 'text-capitalize text-white half-bold mb-2'>details</p>
                <p className = 'text-white'>{description}</p>
            </div>
            <div className = 'pt-3'>
                <a href = {`./student/hostels/${id}`} className = 'half-bold bg-warning p-3 d-block w-100 rounded-2x shadow underline-0 text-capitalize text-center'>see more</a>
            </div>
            <style jsx>{`
                .favourite-hostel{
                    min-height: 180px;
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </div>
    )
}

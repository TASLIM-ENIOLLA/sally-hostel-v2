import {API, SERVER} from '/config'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import Script from 'next/script'
import {ParseObjectToFormData} from '/functions'
import DashboardTemplate from '/components/dashboard'
import {JWTVerficationComponent} from '/components/jwt'
import {HostelCard} from '/components/dashboard/HostelCard'

const hostelImageURL = `${SERVER.BACKEND.URL}images/hostel-owner/`

export default function Index({account_type, jwt_token}){
    const {query: {hostelID}} = useRouter()
    const [hostelData, setHostelData] = useState()
    const {name, been_paid_for, hostel_owner_f_name, hostel_owner_l_name, hostel_type, photos, owner_id, id, address, price, vacant_apartments, type, features, views, timestamp, owner_verified, description} = hostelData || {}

    useEffect(() => {
        fetch(API.student.get_hostel_data, {method: 'POST', body: ParseObjectToFormData({jwt_token, hostel_id: hostelID})})
        .then(e => e.json())
        .then(({data}) => setHostelData(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>Hostel: "{name}"</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid py-5'>{
                    (hostelData)
                    ? (
                        <div className = 'row mb-5'>
                            <div className = 'col-lg-8'>
                                <div className = 'row'>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>photos</h5>
                                        <ImageDisplay hostelID = {id} ownerID = {owner_id} imageList = {photos} />
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>hostel name</h5>
                                        <p className = 'text-muted text-sentence'>{name}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>location</h5>
                                        <p className = 'text-muted text-sentence'>{address}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>price</h5>
                                        <p className = 'text-muted text-sentence'>N{new Intl.NumberFormat().format(price)}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>apartment type</h5>
                                        <p className = 'text-muted text-sentence'>{hostel_type}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>features</h5>
                                        <p className = 'text-muted text-sentence'>{
                                            features.map((each, index) => (
                                                <span key = {index} className = 'px-4 py-2 rounded-2x bg-warning shadow-sm text-dark d-inline-block mr-3 mb-3 text-sentence'>{each}</span>
                                            ))
                                        }</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>Posted by</h5>
                                        <p className = 'text-muted text-capitalize'>{hostel_owner_f_name} {hostel_owner_l_name}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>vacant apartments</h5>
                                        <p className = 'text-muted text-sentence'>{new Intl.NumberFormat().format(vacant_apartments)}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>description</h5>
                                        <p className = 'text-muted text-sentence'>{description}</p>
                                    </div>
                                    <div className = 'col-12 mb-5'>
                                        <h5 className = 'theme-color text-capitalize mb-3'>get direction</h5>
                                        <div id="map" className = "bg-secondary all-round rounded-2x shadow" style = {{
                                            top: 0,
                                            bottom: 0,
                                            width: "100%",
                                            height: "300px",
                                            backgroundSiz: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundImage: 'url(/images/map.png)'
                                        }}></div>
                                    </div>{
                                        (owner_verified)
                                        ? (
                                            <div className = 'col-12'>{
                                                (been_paid_for)
                                                ? (
                                                    <p className = 'theme-color half-bold text-sentence mb-3'>you have already made payment for this hostel. Do you want to make another?</p>
                                                )
                                                : <></>
                                            }
                                                <a  href = {`../make-payment/${id}`} className = 'text-center p-4 rounded-2x shadow theme-bg text-white underline-0 border-0 d-block w-100 text-capitalize half-bold'>make payment</a>
                                            </div>
                                        )
                                        : (
                                            <div className = 'col-12'>
                                                <p className = 'text-danger half-bold text-sentence mb-3'>payment has been disallowed for this hostel as it's owner's account has not been verified</p>
                                                <button className = 'disabled p-4 rounded-2x shadow bg-danger text-white border-0 d-block w-100 text-capitalize half-bold'>make payment</button>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                    : <></>
                }</section>
                <style jsx>{`
                    @keyframes all_round{
                        from{background-position: top left}
                        to{background-position: bottom right}
                    }
                    .all-round{
                        animation: all_round 30s ease infinite;
                    }
                    .z-index-10{
                        z-index: 10;
                    }
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

function ImageDisplay({imageList = [], ownerID, hostelID}){
    const [images, setImages] = useState(imageList)
    const [displayImage, setDisplayImage] = useState(images[0])

    return (
        <div>
            <div style = {{minHeight: '300px', backgroundImage: `url(${hostelImageURL}${ownerID}/${hostelID}/${displayImage})`}} className = 'all-corners bgs bg-light rounded-1x shadow mb-5'></div>
            <div className = 'row'>{
                images.map((each, index) => (
                    <div className = 'col-auto' key = {`${new Date().getTime()}-${index}`}>
                        <div onClick = {() => setDisplayImage(each)} style = {{
                            minHeight: '100px',
                            width: '100px',
                            backgroundImage: `url(${hostelImageURL}${ownerID}/${hostelID}/${each})`
                        }} className = 'cursor-pointer flicker bgs bg-light rounded-1x shadow mb-4'></div>
                    </div>
                ))
            }</div>
            <style>{`
                @keyframes all_corners{
                    from{
                        background-position: top left;
                    }
                    to{
                        background-position: bottom right;
                    }
                }
                .all-corners{
                    animation: all_corners 10s ease alternate infinite;
                }
                .bgs{
                    background-size: cover;
                    background-position: center;
                    background-color: rgba(0,0,0,.3);
                }
            `}</style>
        </div>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {account_type}, resolvedUrl} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(/\bhostel\-owner\b/.test(resolvedUrl)) return {
        notFound: true
    }
    else if(!cookie) return {
        redirect: {
            destination: `/408`
        }
    }

    return {
        props: {
            account_type: 'student',
            jwt_token: cookie
        }
    }
}

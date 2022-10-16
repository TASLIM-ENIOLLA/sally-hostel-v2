import {useEffect, useState} from 'react'
import {JWTVerficationComponent} from '/components/jwt'
import DashboardTemplate from '/components/dashboard'
import {CircleIntersect} from '/components/svg'
import {NotificationCard} from '/components/dashboard/NotificationCard'

export default function Index({account_type, jwt_token}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <DashboardTemplate account_type = {account_type}>
                <section className = 'container-fluid py-5 po-sticky top-0 left-0 w-100 bg-light-fade-down z-index-10'>
                    <div className = 'row a-i-c j-c-space-between'>
                        <div className = 'col-auto'>
                            <div className = 'h2 text-capitalize theme-color'>payments</div>
                        </div>
                    </div>
                </section>
                <section className = 'container-fluid'>
                    <div className = 'row mb-5'>
                        <div className = 'col-lg-5 mb-4'>
                            <MyCard />
                        </div>
                        <div className = 'col-lg-7 mb-4'>
                            <Receipts />
                        </div>
                    </div>
                </section>
                <style jsx>{`
                    .bg-light-fade-down{
                        background: linear-gradient(to bottom, #f8f9fa 80%, #f8f9fa00);
                    }
                    .z-index-10{
                        z-index: 10;
                    }
                `}</style>
            </DashboardTemplate>
        </JWTVerficationComponent>
    )
}

function MyCard(){
    return (
        <div className = 'container-fluid mb-4 p-4 theme-bg shadow-sm rounded-2x'>
            <div className = 'row a-i-c j-c-space-between mb-6'>
                <div className = 'col-auto'>
                    <div className = 'text-capitalize half-bold text-white'>sally hostel</div>
                </div>
                <div className = 'col-auto'>
                    <CircleIntersect />
                </div>
            </div>
            <div className = 'row a-i-c j-c-space-between mb-3'>
                <div className = 'col-12'>
                    <div className = 'h4 text-capitalize text-white'>1234 5678 9123 XXXX</div>
                </div>
            </div>
            <div className = 'row a-i-c j-c-space-between'>
                <div className = 'col-auto'>
                    <div className = 'row'>
                        <div className = 'col-auto text-white'>
                            <div>VALID THRU</div>
                            <div>05 / 24</div>
                        </div>
                        <div className = 'col-auto text-white'>
                            <div>CVV</div>
                            <div>09X</div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .mb-6{
                    margin-bottom: 6rem;
                }
            `}</style>
        </div>
    )
}

function AddNewCard(){
    return (
        <div className = 'container-fluid mb-4 p-4 bg-white shadow-sm rounded-2x'>
            <div className = 'row mb-4 j-c-space-between'>
                <div className = 'col-auto'>
                    <p className = 'm-0 bold text-capitalize'>payment method</p>
                </div>
                <div className = 'col-auto'>
                    <button className = 'theme-bg border-0 shadow rounded-1x text-white px-4 py-3'>
                        Add new card
                    </button>
                </div>
            </div>
            <div className = 'row'>
                <div className = 'col-12 mb-4'>
                    <p className = 'mb-1 text-sentence'>card name</p>
                    <input placeholder = 'John Doe' className = 'border rounded-1x d-block w-100 bg-clear p-3' />
                </div>
                <div className = 'col-12 mb-4'>
                    <p className = 'mb-1 text-sentence'>card number</p>
                    <div className = 'container'>
                        <div className = 'border rounded-1x row a-i-c'>
                            <div className = 'col-auto pr-0'>
                                <MasterCardCircle />
                            </div>
                            <div className = 'col pl-0'>
                                <input placeholder = '1234 5678 9123 XXXX' className = 'border-0 outline-0 rounded-1x d-block w-100 bg-clear p-3' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'col-lg-6 mb-4'>
                    <p className = 'mb-1 text-sentence'>MM / YY</p>
                    <input placeholder = 'MM / YY' className = 'border rounded-1x d-block w-100 bg-clear p-3' />
                </div>
                <div className = 'col-lg-6 mb-4'>
                    <p className = 'mb-1 text-sentence'>CVV</p>
                    <input placeholder = 'CVV' className = 'border rounded-1x d-block w-100 bg-clear p-3' />
                </div>
            </div>
        </div>
    )
}

function Receipts(){
    return (
        <div className = 'container-fluid p-4 bg-white shadow-sm rounded-2x'>
            <div className = 'row mb-4 a-i-c j-c-space-between'>
                <div className = 'col-12'>
                    <p className = 'm-0 bold text-capitalize'>receipts</p>
                </div>
            </div>
            <div className = 'row a-i-c j-c-space-between'>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
                <div className = 'col-12 mb-4'>
                    <ReceiptCard />
                </div>
            </div>
        </div>
    )
}

function ReceiptCard(){
    return (
        <div className = 'theme-bg-light py-3 rounded-1x container-fluid'>
            <div className = 'row a-i-c'>
                <div className = 'col'>
                    <div className = 'bold mb-2 text-dark'>March 10, 2020</div>
                    <div className = 'half-bold text-muted'>REF:- 1334-6546-1355-7565</div>
                </div>
                <div className = 'col-auto'>
                    <div className = 'half-bold text-muted'>$180.00</div>
                </div>
                <div className = 'col-auto'>
                    <button className = 'bg-clear border-0 half-bold theme-color text-capitalize p-1 underline'>view</button>
                </div>
            </div>
        </div>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {account_type}, resolvedUrl} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(!cookie) return {
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

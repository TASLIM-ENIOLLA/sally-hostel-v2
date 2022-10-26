import {API} from '/config'
import {notify2} from '/components/popup'
import {useState, useEffect} from 'react'
import {ParseObjectToFormData} from '/functions'
import Pages from '/components/pages/hostel-owner/hostels/new'
import PagesContext from '/contexts/pages/hostel-owner/hostels/new'
import {SplitPageComponent} from '/components/dashboard/SplitPageComponent'

export default function New({jwt_token}){
    useEffect(() => {
        fetch(API.decode_token, {method: 'POST', body: ParseObjectToFormData({jwt_token})})
        .then(e => e.json())
        .then(({data: {id}}) => setHostelData({
            ...hostelData,
            owner_id: id
        }))
    }, [])

    const [hostelData, setHostelData] = useState({
        owner_id: '',
        name: '',
        address: '',
        type: '',
        description: '',
        features: [],
        price: 0,
        'photos[]': [],
        vacant_apartments: 0
    })
    const [pageIndex, setPageIndex] = useState(0)
    const Page = Pages[pageIndex]
    const PageComponent = Page.component
    const PageTitle = Page.title
    const PageSubTitle = Page.subTitle
    const PageFormValidation = Page.form_validation

    const PagesContextValue = {
        hostelData,
        updateHostelData: (object) => setHostelData({
            ...hostelData,
            ...object
        }),
        canNext: pageIndex < Pages.length - 1,
        next: (...params) => {
            if(typeof PageFormValidation === 'function'){
                const {type, message} = PageFormValidation(...params)

                if(type === 'success'){
                    if(PagesContextValue.canNext) setPageIndex(pageIndex + 1)
                    else PagesContextValue.finish()
                }
                else{
                    notify2({
                        type: 'danger',
                        message: message
                    })
                }


            }
            else if(PagesContextValue.canNext) setPageIndex(pageIndex + 1)
        },
        canBack: pageIndex > 0,
        back: () => (
            (pageIndex > 0)
            ? setPageIndex(pageIndex - 1)
            : undefined
        ),
        finish: () => {
            fetch(API.hostel_owner.add_new_hostel, {
                method: 'POST',
                body: ParseObjectToFormData(hostelData)
            })
            .then(e => e.json())
            .then(({data, message, type}) => notify2({
                type,
                message,
                onSucceed: () => window.location = '/hostel-owner/my-hostels'
            }))
        }
    }

    return (
        <SplitPageComponent
            title = {PageTitle}
            subTitle = {PageSubTitle}>
            <PagesContext.Provider value = {PagesContextValue}>
                <PageComponent />
            </PagesContext.Provider>
        </SplitPageComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}} = context
    const cookie = cookies['SALLY_HOSTEL']

    if(!cookie) return {
        redirect: {
            destination: '/408'
        }
    }

    return {
        props: {jwt_token: cookie}
    }
}

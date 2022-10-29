export default function Index(){
    return <></>
}

export function getServerSideProps(){
    return {
        redirect: {
            destination: './admin/login'
        }
    }
}

import {Heart, Map} from '/components/svg'

export const HostelCard = () => {
    return (
        <div className = 'container-fluid py-3 bg-white shadow-sm rounded-2x'>
            <div className = 'hostel-img rounded-2x bg-light mb-3'></div>
            <div className = 'row j-c-space-between a-i-c mb-3'>
                <div className = 'col-auto'>
                    <p className = 'half-bold one-line text-dark text-capitalize m-0'>sally hostel</p>
                </div>
                <div className = 'col-auto'>
                    <button className = 'text-muted border-0 bg-clear p-1'>
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
                    <p className = 'one-line half-bold text-dark text-capitalize m-0'>University of Ilorin</p>
                </div>
            </div>
            <div className = 'row a-i-c'>
                <div className = 'col-auto'>
                    <p className = 'border-0 bg-clear half-bold theme-color m-0'>N5,000</p>
                </div>
            </div>
            <style>{`
                .hostel-img{
                    min-height: 120px;
                    background-image: url(./images/hostelImage.png);
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </div>
    )
}

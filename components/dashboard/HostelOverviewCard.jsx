export const HostelOverviewCard = () => {
    return (
        <div className = 'container-fluid'>
            <div className = 'row theme-bg-light py-4 rounded-2x shadow'>
                <div className = 'col-auto mb-4'>
                    <h5 className = 'm-0 text-capitalize half-bold text-dark'>Hostel name</h5>
                </div>
                <div className = 'col-12'>
                    <div className = 'row j-c-space-between'>
                        <div className = 'col-auto'>
                            <h2 className = 'm-0 text-capitalize half-bold text-dark'>1023</h2>
                            <span className = 'text-capitalize text-muted'>rooms occupied</span>
                        </div>
                        <div className = 'col-auto'>
                            <h3 className = 'm-0 text-capitalize half-bold text-dark'>20</h3>
                            <span className = 'text-capitalize text-muted'>left</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

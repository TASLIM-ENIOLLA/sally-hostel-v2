export const HostelOverviewCard = ({name, href = '', id, rented_apartments, vacant_apartments}) => {
    return (
        <div className = 'container-fluid'>
            <div onClick = {() => window.location = href} className = 'row theme-bg-light py-4 rounded-2x shadow cursor-pointer'>
                <div className = 'col-auto mb-4'>
                    <h5 className = 'm-0 text-capitalize half-bold text-dark one-line'>{name}</h5>
                </div>
                <div className = 'col-12'>
                    <div className = 'row j-c-space-between'>
                        <div className = 'col-auto'>
                            <h2 className = 'm-0 text-capitalize half-bold text-dark'>{rented_apartments}</h2>
                            <span className = 'text-capitalize text-muted'>rented out</span>
                        </div>
                        <div className = 'col-auto text-right'>
                            <h3 className = 'm-0 text-capitalize half-bold text-dark'>{vacant_apartments}</h3>
                            <span className = 'text-capitalize text-muted'>left</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

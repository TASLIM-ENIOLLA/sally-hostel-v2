export const NotificationCard = ({message, timestamp}) => {
    return (
        <div className = 'container-fluid py-4 theme-bg-light rounded-2x shadow-sm'>
            <div className = 'row a-i-c j-c-space-between mb-2'>
                <div className = 'col-auto'>
                    <p className = 'bold text-dark text-capitalize m-0'>hostel support</p>
                </div>
                <div className = 'col-auto'>
                    <div className = 'text-muted text-capitalize half-bold'>{new Date(timestamp).toLocaleDateString()} {new Date(timestamp).toLocaleTimeString()}</div>
                </div>
            </div>
            <div className = 'row a-i-c j-c-space-between'>
                <div className = 'col-12'>
                    <p className = 'double-line text-dark text-capitalize m-0'>{message}</p>
                </div>
            </div>
        </div>
    )
}

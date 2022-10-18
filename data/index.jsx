import {Home, Favorites, Notification, Settings, Payment, Overview, Logout, Receipts} from '/components/svg'

export const URL = {
    'student': [
        {name: 'home', href: '/student', Icon: Home},
        {name: 'favourites', href: '/student/favourites', Icon: Favorites},
        {name: 'notifications', href: '/student/notifications', Icon: Notification},
        {name: 'settings', href: '/student/settings', Icon: Settings},
        {name: 'payments', href: '/student/payments', Icon: Payment},
        {name: 'logout', href: '/student/logout', Icon: Logout},
    ],
    'hostel-owner': [
        {name: 'home', href: '/hostel-owner', Icon: Overview},
        {name: 'my hostels', href: '/hostel-owner/my-hostels', Icon: Home},
        {name: 'notifications', href: '/hostel-owner/notifications', Icon: Notification},
        {name: 'settings', href: '/hostel-owner/settings', Icon: Settings},
        {name: 'receipts', href: '/hostel-owner/receipts', Icon: Receipts},
        {name: 'logout', href: '/hostel-owner/logout', Icon: Logout},
    ]
}

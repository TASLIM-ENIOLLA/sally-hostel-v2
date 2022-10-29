import {Home, Favorites, Notification, Settings, Payment, Archive, Overview, Logout, Receipts} from '/components/svg'

export const URL = {
    'student': [
        {name: 'home', href: '/student', Icon: Home},
        {name: 'favourites', href: '/student/favourites', Icon: Favorites},
        {name: 'notifications', href: '/student/notifications', Icon: Notification},
        {name: 'settings', href: '/student/settings', Icon: Settings},
        {name: 'payments', href: '/student/payments', Icon: Payment},
        {name: 'my profile', href: '/student/my-profile', Icon: Archive},
        {name: 'logout', href: '/student/logout', Icon: Logout},
    ],
    'hostel-owner': [
        {name: 'home', href: '/hostel-owner', Icon: Overview},
        {name: 'my hostels', href: '/hostel-owner/my-hostels', Icon: Home},
        {name: 'notifications', href: '/hostel-owner/notifications', Icon: Notification},
        {name: 'settings', href: '/hostel-owner/settings', Icon: Settings},
        {name: 'logout', href: '/hostel-owner/logout', Icon: Logout},
    ],
    'admin': [
        {name: 'home', href: '/admin/dashboard', Icon: Overview},
        {name: 'users', href: '/admin/dashboard/users', Icon: Archive},
        {name: 'payments', href: '/admin/dashboard/payments', Icon: Payment},
        {name: 'logout', href: '/admin/dashboard/logout', Icon: Logout},
    ]
}

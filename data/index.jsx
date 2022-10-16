import {Home, Favorites, Notification, Settings, Payment, Logout} from '/components/svg'

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
        {name: 'home', href: '/hostel-owner', Icon: Home},
        {name: 'logout', href: '/hostel-owner/logout', Icon: Logout},
    ]
}

const dev = process.env.NODE_ENV !== 'production'

export const SERVER = {
	FRONTEND: {
		URL: (
			(dev)
			? 'http://localhost:3000/'
			: 'https://sallyhostels.vercel.app/'
		)
	},
	BACKEND: {
		URL: (
			(dev)
			? 'http://localhost:80/sally-hostel-v2/'
			: 'https://sally-hostels.000webhostapp.com/'
		)
	},
}

export const API = {
	register:     new URL('php/processes/Register.php', SERVER.BACKEND.URL).href,
	login:        new URL('php/processes/Login.php', SERVER.BACKEND.URL).href,
	verify_token: new URL('php/processes/VerifyJWToken.php', SERVER.BACKEND.URL).href,
	decode_token: new URL('php/processes/DecodeJWToken.php', SERVER.BACKEND.URL).href,
	hostel_owner: {
		add_new_hostel:           new URL('php/processes/hostel-owner/CreateNewHostel.php', SERVER.BACKEND.URL).href,
		get_my_hostels:           new URL('php/processes/hostel-owner/GetMyHostels.php', SERVER.BACKEND.URL).href,
		send_password_reset_mail: new URL('php/processes/hostel-owner/SendPasswordResetMail.php', SERVER.BACKEND.URL).href,
		change_password:          new URL('php/processes/hostel-owner/ChangePassword.php', SERVER.BACKEND.URL).href,
		delete_password:          new URL('php/processes/hostel-owner/DeletePassword.php', SERVER.BACKEND.URL).href,
		verification_status:      new URL('php/processes/hostel-owner/VerificationStatus.php', SERVER.BACKEND.URL).href,
		verify_user:              new URL('php/processes/hostel-owner/VerifyUser.php', SERVER.BACKEND.URL).href,
		get_user_data:            new URL('php/processes/hostel-owner/GetUserData.php', SERVER.BACKEND.URL).href,
		update_data:              new URL('php/processes/hostel-owner/UpdateData.php', SERVER.BACKEND.URL).href,
		get_hostel_data:          new URL('php/processes/hostel-owner/GetHostelData.php', SERVER.BACKEND.URL).href,
		receipts:                 new URL('php/processes/hostel-owner/GetReceipts.php', SERVER.BACKEND.URL).href,
		notifications:            new URL('php/processes/hostel-owner/GetNotifications.php', SERVER.BACKEND.URL).href,
	},
	student: {
		update_data:            new URL('php/processes/student/UpdateData.php', SERVER.BACKEND.URL).href,
		search:                 new URL('php/processes/student/Search.php', SERVER.BACKEND.URL).href,
		verify_user:            new URL('php/processes/student/VerifyUser.php', SERVER.BACKEND.URL).href,
		verification_status:    new URL('php/processes/student/VerificationStatus.php', SERVER.BACKEND.URL).href,
		get_all_hostels:        new URL('php/processes/student/GetAllHostels.php', SERVER.BACKEND.URL).href,
		get_favourite_hostels:  new URL('php/processes/student/GetFavouriteHostels.php', SERVER.BACKEND.URL).href,
		add_to_favourites:      new URL('php/processes/student/AddToFavourites.php', SERVER.BACKEND.URL).href,
		remove_from_favourites: new URL('php/processes/student/RemoveFromFavourites.php', SERVER.BACKEND.URL).href,
		most_viewed_hostel:     new URL('php/processes/student/MostViewedHostel.php', SERVER.BACKEND.URL).href,
		change_password:        new URL('php/processes/student/ChangePassword.php', SERVER.BACKEND.URL).href,
		delete_account:        new URL('php/processes/student/DeleteAccount.php', SERVER.BACKEND.URL).href,
		get_user_data:          new URL('php/processes/student/GetUserData.php', SERVER.BACKEND.URL).href,
		get_hostel_data:        new URL('php/processes/student/GetHostelData.php', SERVER.BACKEND.URL).href,
		register_payment:       new URL('php/processes/student/RegisterPayment.php', SERVER.BACKEND.URL).href,
		notifications:          new URL('php/processes/student/GetNotifications.php', SERVER.BACKEND.URL).href,
		payments:               new URL('php/processes/student/GetPayments.php', SERVER.BACKEND.URL).href,
	},
	admin: {
		login: new URL('php/processes/admin/Login.php', SERVER.BACKEND.URL).href,
		users: new URL('php/processes/admin/Users.php', SERVER.BACKEND.URL).href,
		payments: new URL('php/processes/admin/Payments.php', SERVER.BACKEND.URL).href,
		get_user_data: new URL('php/processes/admin/GetUserData.php', SERVER.BACKEND.URL).href,
	}
}

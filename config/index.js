const dev = process.env.NODE_ENV !== 'production'

export const SERVER = {
	FRONTEND: {
		URL: (
			(dev)
			? 'http://localhost:3000/'
			: 'http://unknown/'
		)
	},
	BACKEND: {
		URL: (
			(dev)
			? 'http://localhost:80/sally-hostel-v2/'
			: 'http://unknown/'
		)
	},
}

export const API = {
	register: new URL('php/processes/Register.php', SERVER.BACKEND.URL).href,
	login: new URL('php/processes/Login.php', SERVER.BACKEND.URL).href,
	verify_token: new URL('php/processes/VerifyJWToken.php', SERVER.BACKEND.URL).href,
}

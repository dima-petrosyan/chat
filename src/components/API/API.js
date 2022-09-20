
import * as axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true, // as we have crossdomen request (localhost server and api server), we must send our page's cookie manually, 'withCredentials' - settings of request (login, params etc)
	headers: {
		'api-key': '575a5395-877c-4452-aa18-8f87f71c2aa0'
	}
})

export const usersAPI = {
	getUsers(currentPage = 1, pageSize = 10) {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`)
			.then(response => response.data)
	}
}

export const authAPI = {

	auth() {
		return instance.get(`auth/me`)
			.then(response => response.data)
	},

	login(email, password, rememberMe = false, captcha = null) {
		return instance.post(`auth/login`, { email, password, rememberMe, captcha })
			.then(response => response.data)
	},

	logout() {
		return instance.delete(`auth/login`) // server delete cookie of the user
			.then(response => response.data)
	}

}

export const followAPI = {

	follow(userId) {
		return instance.post(`follow/${userId}`)
			.then(response => response.data)
	},

	unfollow(userId) {
		return instance.delete(`follow/${userId}`)
			.then(response => response.data)
	}

}

// get/delete requests can't give smth ro server except url address(URI or Get parameters)
// post/put requests can give smth (request payload/body) to server
export const profileAPI = {

	getProfile(userId) {
		return instance.get(`profile/${userId}`)
			.then(response => response.data)
	},

	getStatus(userId) {
		return instance.get(`profile/status/${userId}`)
			.then(response => response.data)
	},

	// can send json object as a second parameter
	updateStatus(status) {
		return instance.put(`profile/status`, {
			status
		}).then(response => response.data)
	},

	savePhoto(photoFile) {
		const formData = new FormData()
		formData.append('image', photoFile)
		return instance.put(`profile/photo`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
	},

	saveProfile(profile) {
		return instance.put(`profile`, profile)
			.then(response => response.data)
	},

}

export const securityAPI = {

	getCaptchaUrl() {
		return instance.get(`security/get-captcha-url`)
			.then(response => response.data)
	}

}



















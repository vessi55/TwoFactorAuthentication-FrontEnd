import axios from "axios"

import { USERS_API_URL } from '../../Constants.js'

export const AUTHENTICATED_USER_EMAIL = 'Authenticated User Email'

class UserService {

    loginUser(userLoginRequest) {
        localStorage.setItem(AUTHENTICATED_USER_EMAIL, userLoginRequest.email)
        return axios.post(USERS_API_URL + `/login`, userLoginRequest)
    }

    registerUser(userRegisterRequest) {
        return axios.post(USERS_API_URL + `/register`, userRegisterRequest)
    }

    sendVerificationCodeViaEmail(loginVerificationRequest) {
        return axios.put(USERS_API_URL + `/verify/email`, loginVerificationRequest)
    }

    sendVerificationCodeViaSMS(loginVerificationRequest) {
        return axios.put(USERS_API_URL + `/verify/sms`, loginVerificationRequest)
    }

    submitLoginVerificationCode(userVerificationRequest) {
        return axios.post(USERS_API_URL + '/verification', userVerificationRequest)
    }

    sendResetPasswordEmail(resetPasswordEmailRequest) {
        return axios.post(USERS_API_URL + '/reset', resetPasswordEmailRequest)
    }

    checkIfResetPassLinkIsValid(userId) {
        return axios.get(USERS_API_URL + `/reset/valid/${userId}`)
    }

    resetPassword(resetPasswordRequest) {
        return axios.put(USERS_API_URL + '/reset', resetPasswordRequest)
    }
}

export default new UserService()
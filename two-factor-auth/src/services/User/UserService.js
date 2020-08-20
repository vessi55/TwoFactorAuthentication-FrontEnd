import axios from "axios"

import { USERS_API_URL } from '../../Constants.js'

class UserService {

    loginUser(userLoginRequest) {
        return axios.post(USERS_API_URL + '/login', userLoginRequest)
    }

    registerUser(userRegisterRequest) {
        return axios.post(USERS_API_URL + '/register', userRegisterRequest)
    }

    sendVerificationCodeViaEmail(email) {
        return axios.put(USERS_API_URL + `/verify/email?email=${email}`)
    }

    sendVerificationCodeViaSMS(phone) {
        return axios.put(USERS_API_URL + `/verify/sms?phone=${phone}`)
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
import app from '../Authentication/AxiosConfig.js';
import { USERS_API_URL } from '../../Constants.js'

class UserService {

    loginUser(userLoginRequest) {
        return app.post(USERS_API_URL + '/login', userLoginRequest)
    }

    registerUser(userRegisterRequest) {
        return app.post(USERS_API_URL + '/register', userRegisterRequest)
    }

    sendVerificationCodeViaEmail(email) {
        return app.put(USERS_API_URL + `/verify/email/${email}`)
    }

    sendVerificationCodeViaSMS(phone) {
        return app.put(USERS_API_URL + `/verify/phone/${phone}`)
    }

    sendResetPasswordEmail(resetPasswordEmailRequest) {
        return app.post(USERS_API_URL + '/send/reset', resetPasswordEmailRequest)
    }

    checkIfResetPassLinkIsValid(userId) {
        return app.get(USERS_API_URL + `/reset/valid/${userId}`)
    }

    resetPassword(resetPasswordRequest) {
        return app.put(USERS_API_URL + '/reset', resetPasswordRequest)
    }
}

export default new UserService()
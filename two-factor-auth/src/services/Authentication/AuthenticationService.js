import axios from 'axios'

export const AUTHENTICATED_USER = 'authenticatedUser'

class AuthenticationService {

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    successfulLoginVerification(token) {

        this.setupAxiosInterceptors()

        let bearerToken = this.createJWTToken(token)
        localStorage.setItem(AUTHENTICATED_USER, bearerToken)
    }

    successfulLogout() {
        localStorage.removeItem(AUTHENTICATED_USER)
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(AUTHENTICATED_USER)
        if(user === null) {
            return false;
        }
        else {
            return true;
        }
    }
    getLoggedUserName() {
        let user = localStorage.getItem(AUTHENTICATED_USER)
        if(user === null) {
            return ''
        }
        else {
            return user;
        }
    }

    setupAxiosInterceptors() {

        axios.interceptors.request.use(
            config => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = localStorage.getItem(AUTHENTICATED_USER)
                }
                return config
            },
            error => {
                return Promise.reject(error);
            }
        )
    }
}

export default new AuthenticationService()
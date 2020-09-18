import axios from 'axios'

export const AUTHENTICATED_USER = 'Authenticated User'
export const AUTHENTICATED_USER_EMAIL = 'Authenticated User Email'

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
        localStorage.removeItem(AUTHENTICATED_USER_EMAIL)
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

    setupAxiosInterceptors() {
        console.log("Inside")
        axios.interceptors.request.use(
            config => {
                if(this.isUserLoggedIn()) {
                    console.log("Is user logged in")
                    config.headers.authorization = localStorage.getItem(AUTHENTICATED_USER)
                }
                console.log("user is logged")
                return config
            },
            error => {
                console.log("Error occured")
                return Promise.reject(error);
            }
        )}
}

export default new AuthenticationService()
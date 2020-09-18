import axios from "axios"

import { INVITATIONS_API_URL } from '../../Constants.js'

class InvitationService {

    sendInvitation(invitationRequest) {
        return axios.post(INVITATIONS_API_URL + `/send`, invitationRequest)
    }

    resendInvitation(invitationId) {
        return axios.put(INVITATIONS_API_URL + `/resend/${invitationId}`)
    }
    
    getAllInvitations() {
        return axios.get(INVITATIONS_API_URL)
    }

    getInvitationsArchive() {
        return axios.get(INVITATIONS_API_URL + `/archive`)
    }

    getInvitationById(invitationId) {
        return axios.get(INVITATIONS_API_URL + `/id/${invitationId}`)
    }

    deleteInvitationById(invitationId) {
        return axios.put(INVITATIONS_API_URL + `/${invitationId}`)
    }

    recoverInvitationById(invitationId) {
        return axios.put(INVITATIONS_API_URL + `/recover/${invitationId}`)
    }

    checkIfSetUpAccountLinkIsValid(invitationId) {
        return axios.get(INVITATIONS_API_URL + `/valid/${invitationId}`)
    }
}

export default new InvitationService()
import React from 'react'

const AlertDialog = ({alert, message}) => {
    return(
        <div className={alert} role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <strong>{message}</strong>
        </div>
    )
}

export default AlertDialog
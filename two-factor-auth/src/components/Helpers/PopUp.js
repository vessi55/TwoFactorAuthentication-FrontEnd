import React from 'react'
import ReactModal from 'react-modal'
import {Modal, Button} from 'react-bootstrap'

const PopUp = ({showModal, title, body, closeAction, buttonAction, buttonName, customStyles}) => {
    return(
        <ReactModal 
            portalClassName="popUp" isOpen={showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={closeAction}
            ariaHideApp={false}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            shouldReturnFocusAfterClose={true}
            style={customStyles}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                <Button variant="info" onClick={buttonAction}>
                    {buttonName}
                </Button>
            </Modal.Footer>
        </ReactModal>
    )
}

export default PopUp
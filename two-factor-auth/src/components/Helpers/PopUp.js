import React, {Component} from 'react'
import ReactModal from 'react-modal'
import {Modal, Button} from 'react-bootstrap'

const PopUp = ({showModal, title, body, closeAction, buttonAction, buttonName}) => {
    return(
        <ReactModal portalClassName="popUp" isOpen={showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={closeAction}
            style={customStyles}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeAction}>
                    Close
                </Button>
                <Button variant="info" onClick={buttonAction}>
                    {buttonName}
                </Button>
            </Modal.Footer>
        </ReactModal>
    )
}


const customStyles = {
  content: {
    width: '50%',
    top: '30%',
    left: '45%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor: 'rgb(235, 244, 247)',
    transform: 'translate(-40%, -10%)',
  },
};

export default PopUp
import React from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';

import Invitations from '../Invitation/Invitations.js'

export default function SimpleMenu(userId) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
       <MoreHorizIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {console.log("resend works");}}>
            <EmailIcon></EmailIcon>
            Resend Invitation 
        </MenuItem>
        <MenuItem onClick={() => {console.log("delete works");}}>
            <DeleteIcon></DeleteIcon>
            Delete Invitation
        </MenuItem>
      </Menu>
    </div>
  );
}
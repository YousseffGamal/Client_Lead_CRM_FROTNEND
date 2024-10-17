// DeleteConfirmationModal.jsx
import React from 'react';
import { Modal, Button, Typography } from '@mui/material';

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="delete-modal-title">
      <div style={{ padding: '20px', textAlign: 'center', background: 'white', margin: 'auto', marginTop: '15%', borderRadius: '8px', width: '300px' }}>
        <Typography id="delete-modal-title" variant="h6">
          Are you sure you want to delete this item?
        </Typography>
        <div style={{ marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal; // Ensure this line is present

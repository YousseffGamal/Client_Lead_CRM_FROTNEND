// SuccessModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Fade, CircularProgress } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const SuccessModal = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setLoading(true);
      const loadingTimer = setTimeout(() => {
        setLoading(false); // Change loading state after 3 seconds
      }, 3000);

      const closeTimer = setTimeout(() => {
        handleClose(); // Close the modal after an additional 3 seconds
      }, 6000); // 3 seconds for loading + 3 seconds for success message

      return () => {
        clearTimeout(loadingTimer);
        clearTimeout(closeTimer); // Cleanup both timers on component unmount or when `open` changes
      };
    }
  }, [open, handleClose]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          {loading ? (
            <>
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Adding blog...
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h6" component="h2">
                Blog Added Successfully!
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Your blog has been added to the system.
              </Typography>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default SuccessModal;

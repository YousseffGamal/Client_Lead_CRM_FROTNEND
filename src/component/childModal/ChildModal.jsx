import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import PaymentIntentForm from "../paymentForm/PaymentForm";
const ChildModal = ({ clientSecret, customerId, close }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeAfterSuccess = (cxId) => {
    close(cxId);
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <>
      <Button onClick={handleOpen}>Verify your payment method</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          {/* <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button> */}
          <PaymentIntentForm
            handleClose={closeAfterSuccess}
            clientSecret={clientSecret}
            customerId={customerId}
          />
        </Box>
      </Modal>
    </>
  );
};
export default ChildModal;

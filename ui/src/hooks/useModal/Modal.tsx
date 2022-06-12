import { Box, Modal as MuiModal, ModalProps } from "@mui/material";
import React from "react";

const Modal = (props: ModalProps) => {
  const { children, ...modalProps } = props;

  return (
    <MuiModal {...modalProps}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "divider",
          borderRadius: (theme) => theme.shape.borderRadius,
          boxShadow: 24,
          p: 2,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;

import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  disabled?: boolean;
}

const DeleteModal = ({ onClose, onConfirm, disabled }: DeleteModalProps) => (
  <>
    <Typography variant="h2" my={1}>
      Supprimer la plante ?
    </Typography>
    <Typography variant="body1" my={2}>
      La plante, ainsi que toutes ses pousses et mesures seront définitivement
      supprimées. Cette action est irréversible.
    </Typography>
    <Box mt={2}>
      <Stack justifyContent="flex-end">
        <Button variant="outlined" onClick={onClose} disabled={disabled}>
          Annuler
        </Button>
        <Button variant="contained" onClick={onConfirm} disabled={disabled}>
          Supprimer
        </Button>
      </Stack>
    </Box>
  </>
);
export default DeleteModal;

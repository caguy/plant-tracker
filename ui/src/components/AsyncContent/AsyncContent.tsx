import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React from "react";

interface AsyncContentProps {
  errorMessage?: string;
  status: "idle" | "loading" | "error" | "success";
  refetch: () => void;
  children: React.ReactNode;
}

const AsyncContent = ({
  errorMessage = "Le chargement a échoué",
  status,
  refetch,
  children,
}: AsyncContentProps) => {
  switch (status) {
    case "loading":
      return (
        <Box display="flex" justifyContent="center" alignItems="center" py={2}>
          <CircularProgress />
        </Box>
      );
    case "error":
      return (
        <Container>
          <Box py={2}>
            <Typography variant="body1">{errorMessage}</Typography>
            <Box pt={2} />
            <Button variant="outlined" onClick={refetch}>
              Réessayer
            </Button>
          </Box>
        </Container>
      );
    case "success":
      return <>{children}</>;
    default:
      return <></>;
  }
};

export default AsyncContent;

import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageIntrouvable = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h1">Page introuvable</Typography>
      <Typography>
        La ressource que vous cherchez à atteindre n&apos;existe pas.
      </Typography>
      <Stack py={4}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Retour à l&apos;accueil
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Page précédente
        </Button>
      </Stack>
    </Container>
  );
};

export default PageIntrouvable;

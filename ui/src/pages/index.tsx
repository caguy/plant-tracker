import { Head } from "@/components";
import { useUser } from "@/hooks";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const IndexPage = () => {
  const user = useUser();

  return (
    <>
      <Head pageTitle="Accueil" />
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h1">
            Bienvenue {user.userInfos?.fullName}
          </Typography>
          <Button
            variant="contained"
            onClick={user.logout}
            disabled={user.isLoading}
          >
            Déconnexion
          </Button>
        </Box>
        <Box my={4}>
          <Typography variant="h2">Mes plantes</Typography>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;

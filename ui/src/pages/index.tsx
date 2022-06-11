import { Head } from "@/components";
import { useUser } from "@/hooks";
import { Container, Typography } from "@mui/material";
import React from "react";

const IndexPage = () => {
  const user = useUser();

  return (
    <>
      <Head pageTitle="Accueil" />
      <Container>
        <Typography variant="h1">
          Bienvenue {user.userInfos?.fullName}
        </Typography>
      </Container>
    </>
  );
};

export default IndexPage;

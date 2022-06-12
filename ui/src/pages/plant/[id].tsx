import { Head } from "@/components";
import { FormControl, Input, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

const PlantPage = () => {
  const theme = useTheme();

  return (
    <Container>
      <Head pageTitle="Nouvelle plante" />
      <FormControl fullWidth>
        <Input sx={{ ...theme.typography.h1 }} />
      </FormControl>
    </Container>
  );
};

export default PlantPage;

import { Head, Login } from "@/components";
import { Box, Typography } from "@mui/material";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <Head pageTitle="Connexion" />
      <Box
        display="flex"
        minHeight="100vh"
        alignItems="center"
        justifyContent="center"
        px={2}
        py={2}
      >
        <Box width={400}>
          <Typography
            variant="overline"
            component="div"
            textAlign="center"
            mb={1}
          >
            Plant-tracker
          </Typography>
          <Login />
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;

import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useIsFetching, useIsMutating } from "react-query";
import { Container } from "@mui/system";

const Layout = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = !!isFetching || !!isMutating;

  return (
    <Box position="relative" component="main" flexGrow={1}>
      {isLoading && (
        <Box position="absolute" top={0} left={0} width="100%" height={4}>
          <LinearProgress />
        </Box>
      )}
      <header>
        <Container>
          <Typography variant="overline" component="div" my={2}>
            Plant-tracker
          </Typography>
        </Container>
      </header>
      <Outlet />
    </Box>
  );
};

export default Layout;

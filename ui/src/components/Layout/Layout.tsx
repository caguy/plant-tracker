import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useIsFetching, useIsMutating } from "react-query";

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
      <Outlet />
    </Box>
  );
};

export default Layout;

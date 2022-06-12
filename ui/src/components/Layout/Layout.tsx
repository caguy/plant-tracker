import React from "react";
import {
  Box,
  IconButton,
  LinearProgress,
  Link,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useIsFetching, useIsMutating } from "react-query";
import { Container } from "@mui/system";
import { HOME_ROUTE } from "@/settings/routes.settings";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useThemeMode } from "@/hooks";

const Layout = () => {
  const themeMode = useThemeMode();
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isLoading = !!isFetching || !!isMutating;

  return (
    <Box position="relative" flexGrow={1}>
      {isLoading && (
        <Box position="absolute" top={0} left={0} width="100%">
          <LinearProgress />
        </Box>
      )}
      <header>
        <Container>
          <Box
            py={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Link to={HOME_ROUTE} component={RouterLink}>
              <Typography variant="overline">Plant-tracker</Typography>
            </Link>
            <Tooltip
              arrow
              title={themeMode.mode === "dark" ? "Mode clair" : "Mode sombre"}
            >
              <IconButton
                sx={{ opacity: (theme) => theme.typography.body2.opacity }}
                aria-label={
                  themeMode.mode === "dark"
                    ? "Passer au mode clair"
                    : "Passer au mode sombre"
                }
                onClick={themeMode.toggle}
              >
                {themeMode.mode === "dark" ? (
                  <LightModeOutlinedIcon sx={{ color: "text.primary" }} />
                ) : (
                  <DarkModeOutlinedIcon sx={{ color: "text.primary" }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </header>
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export default Layout;

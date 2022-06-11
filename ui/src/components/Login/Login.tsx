import { useUser } from "@/hooks";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginForm, LoginSchema } from "./LoginSchema";
import { useQuery } from "react-query";
import { ErrorResponse } from "@/services";
import { useLocation } from "react-router-dom";

const Login = () => {
  const { checkCredentials, isLoading, login } = useUser();
  const isCheckingCredentials = useRef(false);

  const { state } = useLocation();
  const redirectTo =
    (state as { redirectTo?: string | null })?.redirectTo || null;

  useEffect(() => {
    if (isCheckingCredentials.current) return;
    isCheckingCredentials.current = true;
    checkCredentials({ redirectTo });
  }, [checkCredentials, redirectTo]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(LoginSchema) });

  const username = watch("username");
  const password = watch("password");

  const query = useQuery<void, ErrorResponse>(
    ["login", { username, password }],
    () => login({ username, password, redirectTo }),
    {
      enabled: false,
    }
  );

  if (isLoading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      p={4}
      borderRadius={(theme) => theme.shape.borderRadius}
      sx={{
        border: 1,
        borderColor: (theme) => theme.palette.grey[800],
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Typography variant="h1" p={0}>
        Connexion
      </Typography>
      <form onSubmit={handleSubmit(() => query.refetch())}>
        <Box my={2}>
          <FormControl error={!!errors.username} disabled={query.isLoading}>
            <FormLabel htmlFor="username">Nom d&apos;utilisateur</FormLabel>
            <Controller
              name="username"
              control={control}
              render={({ field: { value, ref, ...fields } }) => (
                <Input
                  value={value ?? ""}
                  inputRef={ref}
                  {...fields}
                  id="username"
                />
              )}
            />
            {!!errors.username && (
              <FormHelperText>{errors.username.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl error={!!errors.password} disabled={query.isLoading}>
            <FormLabel htmlFor="password">Mot de passe</FormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, ref, ...fields } }) => (
                <Input
                  type="password"
                  value={value ?? ""}
                  inputRef={ref}
                  {...fields}
                  id="password"
                />
              )}
            />
            {!!errors.password && (
              <FormHelperText>{errors.password.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            {query.isError && (
              <Typography variant="subtitle1" color="error">
                {query.error.response?.data?.message || "Serveur injoignable"}
              </Typography>
            )}
          </Box>
          <Button type="submit" variant="contained" disabled={query.isLoading}>
            Se connecter
          </Button>
        </Box>
      </form>
      {query.isLoading && (
        <LinearProgress
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 3,
          }}
        />
      )}
    </Box>
  );
};

export default Login;

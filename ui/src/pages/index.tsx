import { Head } from "@/components";
import { useApi, useUser } from "@/hooks";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { NEW_PLANT_ROUTE, PLANT_ROUTE } from "@/settings/routes.settings";
import { Link } from "react-router-dom";

const gridItemProps = {
  xs: 6,
  md: 4,
  lg: 3,
};

const IndexPage = () => {
  const user = useUser();
  const { useGetAllPlants } = useApi();
  const { data } = useGetAllPlants();

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
          <Box my={2}>
            <Grid container>
              {data?.map((plant) => (
                <Grid item key={plant.id} {...gridItemProps}>
                  <Link to={PLANT_ROUTE(plant.id)}>
                    <Card>
                      <CardContent>
                        <Typography variant="h3">{plant.name}</Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
              <Grid item {...gridItemProps}>
                <Link to={NEW_PLANT_ROUTE}>
                  <Card>
                    <CardContent>
                      <Typography variant="h3">Nouvelle plante</Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;

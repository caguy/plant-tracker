import { AsyncContent, Head, PlantCard } from "@/components";
import { useApi, useUser } from "@/hooks";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { PLANT_ROUTE } from "@/settings/routes.settings";
import { useNavigate } from "react-router-dom";
import { useIsMutating } from "react-query";

const gridItemProps = {
  xs: 12,
  sm: 6,
  lg: 4,
};

const IndexPage = () => {
  const user = useUser();
  const { useCreatePlant, useGetAllPlants } = useApi();
  const plants = useGetAllPlants();
  const createPlant = useCreatePlant();
  const navigate = useNavigate();
  const isMutating = !!useIsMutating();

  async function onNewPlant() {
    const newPlant = await createPlant.mutateAsync({ name: "Nouvelle plante" });
    navigate(PLANT_ROUTE(newPlant._id), { state: { new: true } });
  }

  return (
    <>
      <Head pageTitle="Accueil" />
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h1">
            Bonjour {user.userInfos?.fullName},
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
          <Typography variant="h2">Toutes vos plantes</Typography>
          <Box my={2}>
            <AsyncContent status={plants.status} refetch={plants.refetch}>
              <Grid container alignItems="stretch">
                {plants.data?.map((plant) => (
                  <Grid item key={plant._id} {...gridItemProps}>
                    <PlantCard
                      name={plant.name}
                      disabled={isMutating || plants.isFetching}
                      updated={plant.updatedAt}
                      onClick={() => navigate(PLANT_ROUTE(plant._id))}
                    />
                  </Grid>
                ))}
                <Grid item {...gridItemProps}>
                  <PlantCard
                    name="Ajouter une plante"
                    newPlant
                    disabled={isMutating || plants.isFetching}
                    onClick={onNewPlant}
                  />
                </Grid>
              </Grid>
            </AsyncContent>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;

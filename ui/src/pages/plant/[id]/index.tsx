import { AsyncContent, Head, PageIntrouvable } from "@/components";
import { useApi } from "@/hooks";
import { Container } from "@mui/system";
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Plant from "./Plant";

const PlantPage = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const { useGetPlantById } = useApi();
  const { data, error, isError, isFetching, refetch, status } = useGetPlantById(
    id ?? ""
  );

  const responseStatus = error?.response?.status;

  if (
    (isError && responseStatus === 401) ||
    responseStatus === 403 ||
    responseStatus === 404
  )
    return (
      <>
        <Head pageTitle="Page introuvable" />
        <PageIntrouvable />
      </>
    );

  return (
    <>
      <Head pageTitle="Nouvelle plante" />
      <AsyncContent status={status} refetch={refetch}>
        {data && (
          <Container>
            <Plant
              id={data._id}
              name={data.name}
              isFetching={isFetching}
              isNew={(state as { new?: boolean })?.new}
            />
          </Container>
        )}
      </AsyncContent>
    </>
  );
};

export default PlantPage;

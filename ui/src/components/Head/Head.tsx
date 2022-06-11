import React from "react";
import { Helmet } from "react-helmet-async";

const Head = ({ pageTitle }: { pageTitle?: string }) => {
  return (
    <>
      <Helmet>
        <title>
          {pageTitle ? pageTitle + " | " : ""}Suivi de la pousses des plantes
        </title>
      </Helmet>
    </>
  );
};

export default Head;

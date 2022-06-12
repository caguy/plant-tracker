import React from "react";
import {
  Layout,
  PageIntrouvable,
  PrivateRoute,
  QueryProvider,
  ThemeProvider,
} from "@/components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "@/hooks";
import { HelmetProvider } from "react-helmet-async";
import * as routes from "@/settings/routes.settings";

import IndexPage from "@/pages/index";
import LoginPage from "@/pages/login";
import PlantPage from "@/pages/plant/[id]";

const App = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <BrowserRouter>
          <UserProvider>
            <HelmetProvider>
              <Routes>
                <Route path={routes.LOGIN_ROUTE} element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                  <Route element={<Layout />}>
                    <Route path={routes.HOME_ROUTE} element={<IndexPage />} />
                    <Route
                      path={routes.PLANT_ROUTE(":id")}
                      element={<PlantPage />}
                    />
                    <Route path="*" element={<PageIntrouvable />} />
                  </Route>
                </Route>
              </Routes>
            </HelmetProvider>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;

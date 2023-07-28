import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { Bullseye, Spinner } from "@patternfly/react-core";

const OverviewPage = lazy(() => import("./pages/overview"));

export const AppRoutes = () => {
  const routes = [
    {
      Component: OverviewPage,
      path: "/overview",
      hasDescendant: false,
    },
  ];

  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <Routes>
        {routes.map(({ path, hasDescendant, Component }, index) => (
          <Route
            key={index}
            path={!hasDescendant ? path : `${path}/*`}
            element={<Component />}
          ></Route>
        ))}
        <Route path="/" element={<Navigate to="/overview" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

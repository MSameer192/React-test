// All components mapping with path for internal routes

import { lazy } from "react";

const Welcome = lazy(() => import("../pages/protected/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Customers = lazy(() => import("../pages/protected/Customers"));
const DeletedCustomers = lazy(() =>
  import("../pages/protected/DeletedCustomers")
);

const routes = [
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },

  {
    path: "/customer",
    component: Customers,
  },
  {
    path: "/deleted-customer",
    component: DeletedCustomers,
  },

  {
    path: "/404",
    component: Page404,
  },
];

export default routes;

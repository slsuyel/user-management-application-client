import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import UserList from "../pages/UserList/UserList";
import UpdateUser from "../pages/UpdateUser/UpdateUser";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import NewUser from "../pages/NewUser/NewUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <UserList />,
      },
      {
        path: "/newuser",
        element: <NewUser />,
      },
      {
        path: "/userlist",
        element: <UserList />,
      },
      {
        path: "/userupdate/:id",
        element: <UpdateUser />,
      },
    ],
  },
]);
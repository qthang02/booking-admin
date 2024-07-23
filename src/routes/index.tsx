import { Categories } from "../features/categories";
import CustomerPage from "../features/customer/page";
import EmployeeList from "../features/employee/page";
import Login from "../features/login/login";
import MainLayout from "../conponents/MainLayout";
import {Profile} from "../features/profile/page";
import {Room} from "../features/room/page";
import {createBrowserRouter} from "react-router-dom";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/rooms",
                element: <Room />
            },
            {
                path: "/customer",
                element: <CustomerPage />
            },
            {
                path: "/employee",
                element: <EmployeeList />
            },
            {
                path: "/categories",
                element: <Categories />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    },
];

export const router = createBrowserRouter(routes);
import CategoryPage from "../features/categories/page";
import CustomerPage from "../features/customer/page";
import { EmployeePage } from "../features/employee/page";
import Login from "../features/login/login";
import MainLayout from "../conponents/MainLayout";
import OrderPage from "../features/orders/page";
import {Profile} from "../features/profile/page";
import RoomPage from "../features/room/page";
import {createBrowserRouter} from "react-router-dom";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/rooms",
                element: <RoomPage />
            },
            {
                path: "/customer",
                element: <CustomerPage />
            },
            {
                path: "/employee",
                element: <EmployeePage/>
            },
            {
                path: "/categories",
                element: <CategoryPage />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/order",
                element: <OrderPage />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    },
];

export const router = createBrowserRouter(routes);
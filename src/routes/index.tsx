import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../conponents/MainLayout";
import {Room} from "../features/room/page";
import {Employee} from "../features/employee/page";
import {Report} from "../features/report/page";
import {Profile} from "../features/profile/page";
import {Customer} from "../features/customer/page";

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
                element: <Customer />
            },
            {
                path: "/employee",
                element: <Employee />
            },
            {
                path: "/report",
                element: <Report />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    },
];

export const router = createBrowserRouter(routes);
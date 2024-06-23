import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../MainLayout";

export const routes = [
    {
        path: "/",
        element: <MainLayout />
    }
];

export const router = createBrowserRouter(routes);
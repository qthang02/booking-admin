import ReactDOM from 'react-dom/client'
import './index.css'
import {router} from "./conponents/routes";
import {RouterProvider} from "react-router-dom";
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ConfigProvider
        theme={{
            token: {
                fontFamily: "Be Vietnam Pro",
            },
        }}
    >
        <RouterProvider router={router} />
    </ConfigProvider>
)

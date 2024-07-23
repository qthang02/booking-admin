import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

// Tạo instance của QueryClient
const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                cacheTime: Infinity,
            },
        },
    });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: 'Be Vietnam Pro',
      },
    }}
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ConfigProvider>
);

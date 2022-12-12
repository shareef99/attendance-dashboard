import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import CustomMantineProvider from "./components/CustomMantineProvider";
import "./styles/main.css";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "@mantine/notifications";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setUpInterceptors } from "./api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

setUpInterceptors();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CustomMantineProvider>
          <NotificationsProvider>
            <Suspense fallback={<></>}>
              <App />
            </Suspense>
          </NotificationsProvider>
        </CustomMantineProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

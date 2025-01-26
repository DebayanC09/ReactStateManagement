import React from "react";
import AppRouter from "./router/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/AppStore";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AppRouter />
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

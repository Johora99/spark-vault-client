import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import './index.css'
import './custom.css'
import RouteProvider from "./Route/RouteProvider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from "./AuthProvider/AuthProvider";
const queryClient = new QueryClient()


const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
      <RouteProvider></RouteProvider>
    </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);
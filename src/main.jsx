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
import { LikeProvider } from "./Context/LikeContext";
import { ToastContainer, toast } from 'react-toastify';
import { ReportProvider } from "./Context/ReportContext";
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient()


const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <QueryClientProvider client={queryClient}>
        <AuthProvider>
      <HelmetProvider>
      <BrowserRouter>
    <ReportProvider>
        <LikeProvider>
        <RouteProvider></RouteProvider>
      </LikeProvider>
    </ReportProvider>
    </BrowserRouter>
    <ToastContainer />
      </HelmetProvider>
    </AuthProvider>
  </QueryClientProvider>
);
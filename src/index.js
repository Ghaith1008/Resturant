import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CountProvider } from "./context/CountContext";
import './styles/fonts.css';import { LoaderProvider } from "./context/LoaderContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoaderProvider>
      
    
    <CountProvider>
      <App />
    </CountProvider>
    </LoaderProvider>
  </React.StrictMode>
);
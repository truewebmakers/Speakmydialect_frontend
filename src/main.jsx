import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/authContext.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme you prefer
import "primereact/resources/primereact.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <App />
          <ToastContainer />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { LightgalleryProvider } from "react-lightgallery";
import "primereact/resources/themes/saga-blue/theme.css"; // or any other theme you prefer
import "primereact/resources/primereact.min.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <LightgalleryProvider
          container=".modal-content" // specify the container for the lightgallery
          onBeforeOpen={() => console.info("onBeforeOpen")}
          onAfterOpen={() => console.info("onAfterOpen")}
          onSlideItemLoad={() => console.info("onSlideItemLoad")}
          onBeforeSlide={() => console.info("onBeforeSlide")}
          onAfterSlide={() => console.info("onAfterSlide")}
          onBeforePrevSlide={() => console.info("onBeforePrevSlide")}
          onBeforeNextSlide={() => console.info("onBeforeNextSlide")}
          onDragstart={() => console.info("onDragstart")}
          onDragmove={() => console.info("onDragmove")}
          onDragend={() => console.info("onDragend")}
          onSlideClick={() => console.info("onSlideClick")}
          onBeforeClose={() => console.info("onBeforeClose")}
          onCloseAfter={() => console.info("onCloseAfter")}
        >
          <App />
          <ToastContainer />
        </LightgalleryProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

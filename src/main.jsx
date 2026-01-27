import React from "react";
import ReactDOM from "react-dom/client"; // IMPORTANTE: muda para 'react-dom/client'
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/config/store";
import { persistor } from "./store/config/persistor";
import { PersistGate } from "redux-persist/integration/react";
import { MantineProvider } from "@mantine/core";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);

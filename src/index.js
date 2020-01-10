import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App.js";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import allReducer from "./reducers/index";
import { Provider } from "react-redux";
import 'leaflet/dist/leaflet.css';


const store = createStore(
  allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({
    latency: 0
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);


serviceWorker.unregister();

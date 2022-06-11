import { legacy_createStore as createStore } from "redux";
import aviaMock from "./reducer";

const store = createStore(
  aviaMock,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;

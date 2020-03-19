import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//引入bootstrap样式
import "bootstrap/dist/css/bootstrap.css";
//引入font-awesome样式
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";
import logger from "./services/logService";
//引入计数器组件
// import Counter from "./components/counter";
//电影表
// import MoviesManager from "./components/moviesManager";

// ReactDOM.render(element, document.getElementById("root"));
// ReactDOM.render(<Counter />, document.getElementById("root"));
// ReactDOM.render(<MoviesManager />, document.getElementById("root"));
console.log(process.env);

logger.init();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

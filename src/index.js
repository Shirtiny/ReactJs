import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
//引入bootstrap样式
import "bootstrap/dist/css/bootstrap.css";
//引入font-awesome样式
import "font-awesome/css/font-awesome.css";
//引入计数器组件
// import Counter from "./components/counter";
//电影表
// import MovieTable from "./components/movieTable";

const element = <h1>第一个react程序</h1>;
let count = 0;
const interval = setInterval(() => {
  console.log(element, (count += 5), "秒");
  if (count === 20) {
    clearInterval(interval);
    console.log("结束打印");
  }
}, 5000);

// ReactDOM.render(element, document.getElementById("root"));
// ReactDOM.render(<Counter />, document.getElementById("root"));
// ReactDOM.render(<MovieTable />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

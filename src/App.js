import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import MovieTable from "./components/movieTable";
import Counters from "./components/counters";

function App() {
  return (
    <div className="container">
      {/* 引入组件 */}
      <Counters />
    </div>
  );
}

export default App;

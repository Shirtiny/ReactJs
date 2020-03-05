import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import MovieTable from "./components/movieTable";

function App() {
  return (
    <div className="container">
      {/* 引入视频表组件 */}
      <MovieTable />
    </div>
  );
}

export default App;

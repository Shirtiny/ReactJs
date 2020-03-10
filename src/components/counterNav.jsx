import React from "react";

//sfc stateless function component 无状态函数组件
const CounterNav = props => {
  return (
    <nav className="navbar navbar-light bg-light">
      <span>有效值{props.totalCount}</span>
    </nav>
  );
};

export default CounterNav;

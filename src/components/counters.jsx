import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  constructor(props) {
    super(props);
    console.log("装配Counters对象ing，mounting");
    console.log(
      "执行Counters构造方法",
      "构造器传入形参props以查看",
      this.props
    );
  }

  componentDidMount(){
    console.log("装配Counters完成","componentDidMount");
  }

  componentDidUpdate(){
    console.log("更新Counters完成","componentDidUpdate");
  }

  componentWillUnmount(){
    console.log("卸载Counters完成","componentWillUnmount");
  }

  render() {
    console.log("执行Counters的render()渲染");
    return (
      <div>
        <button className="btn-danger btn-sm m-2" onClick={this.resetCounters}>
          Reset
        </button>
        {this.props.counters.map(c => (
          <Counter
            key={c.id}
            counter={c}
            incrFunc={this.props.incrFunc}
            reduFunc={this.props.reduFunc}
          />
        ))}
      </div>
    );
  }
}

export default Counters;

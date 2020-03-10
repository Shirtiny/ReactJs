import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
// import MovieTable from "./components/movieTable";
import Counters from "./components/counters";
import CounterNav from "./components/counterNav";

class App extends Component {
  constructor() {
    super();
    console.log("装配APP对象ing，mounting");
    console.log("执行APP构造方法", this.props);
  }

  componentDidMount(){
    console.log("装配APP完成","componentDidMount");
  }

  componentDidUpdate(){
    console.log("更新APP完成","componentDidUpdate");
  }

  componentWillUnmount(){
    console.log("卸载APP完成","componentWillUnmount");
  }

  state = {
    counters: [
      { id: 0, value: 0 },
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 }
    ]
  };

  //重置计数器
  resetCounters = () => {
    const counters = this.state.counters.map(c => {
      c.value = c.id;
      return c;
    });
    console.log("重置", this.state.counters, counters);
    this.setState({ counters });
  };

  //增加count 需要用到this 使用es6 不然就用构造器解决
  incrCount = counter => {
    //这里counters实际依然指向this.state.counters
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    //改变新的对象 而不直接改变this.state 由setState()来统一改变它
    counters[index] = { ...counter };
    counters[index].value++;
    console.log("dom更新前", this.state.counters);
    //通知react状态更新
    this.setState({ counters });
    setTimeout(() => {
      console.log("延迟1秒，dom更新后", this.state.counters);
    }, 1000);
  };

  // 减少count
  reduCount = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    // console.log("减少", index, counters[3], this.state.counters[3]);
    this.setState({ counters });
  };

  render() {
    console.log("执行APP的render()渲染");
    return (
      <React.Fragment>
        <CounterNav
          totalCount={this.state.counters.filter(c => c.value > 0).length}
        />
        <main className="container-fluid">
          <Counters
            counters={this.state.counters}
            incrFunc={this.incrCount}
            reduFunc={this.reduCount}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;

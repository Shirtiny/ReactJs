import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
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

  //减少count
  reduCount = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    // console.log("减少", index, counters[3], this.state.counters[3]);
    this.setState({ counters });
  };

  render() {
    return (
      <div>
        <button className="btn-danger btn-sm m-2" onClick={this.resetCounters}>
          Reset
        </button>
        {this.state.counters.map(c => (
          <Counter
            key={c.id}
            counter={c}
            incrFunc={this.incrCount}
            reduFunc={this.reduCount}
          />
        ))}
      </div>
    );
  }
}

export default Counters;

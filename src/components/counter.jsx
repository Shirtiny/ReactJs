import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    lines: ["line1", "line2", "line3"]
  };

  styles = {
    //   fontSize: '25px'
    // fontSize: 20
  };

  render() {
    return (
      <main className="container">
        <button
          className="btn btn-primary btn-sm"
          onClick={this.reduCount}
          disabled={this.state.count <= 0}
        >
          减少
        </button>
        <span className={this.changeCountClass()} style={this.styles}>
          {this.fomatCount()}
        </span>
        <button className="btn btn-primary btn-sm" onClick={this.incrCount}>
          增加
        </button>
        <ul>
          {this.state.lines.map(line => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </main>
    );
  }

  //格式化计数
  fomatCount() {
    //对象析构
    const { count: ct } = this.state;
    return ct === 0 ? "无" : ct + "元";
  }

  //按情况改变数字的class
  changeCountClass() {
    let classes = "m-2 badge badge-";
    return (classes += this.state.count === 0 ? "warning" : "info");
  }

  //增加count 需要用到this 使用es6 不然就用构造器解决
  incrCount = () => {
    //通知react状态更新
    this.setState({ count: this.state.count + 1 });
  };

  //减少count
  reduCount = () => {
    this.setState({ count: this.state.count - 1 });
  };
}

export default Counter;

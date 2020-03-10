import React, { Component } from "react";

class Counter extends Component {
  styles = {
    //   fontSize: '25px'
    // fontSize: 20
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.props.reduFunc(this.props.counter)}
          disabled={this.props.counter.value <= 0}
        >
          减少
        </button>
        <span className={this.changeCountClass()} style={this.styles}>
          {this.fomatCount(this.props.counter.value)}
        </span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.props.incrFunc(this.props.counter)}
        >
          增加
        </button>
      </div>
    );
  }

  //格式化计数
  fomatCount(ctValue) {
    //对象析构
    // const { value: ctValue } = this.props.counter;
    return ctValue === 0 ? "无" : ctValue + "元";
  }

  //按情况改变数字的class
  changeCountClass() {
    let classes = "m-2 badge badge-";
    return (classes += this.props.counter.value === 0 ? "warning" : "info");
  }
}

export default Counter;

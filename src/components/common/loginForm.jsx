import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = {
    form: {
      username: "",
      password: ""
    }
  };

  //创建一个ref 用于返回对应绑定的dom对象 但不推荐使用ref
  userNameRef = React.createRef();
  //测试ref的使用
  testRef = () => {
    //通过ref获取UserName输入框的dom对象 对象的value值便是Username的值
    console.log(this.userNameRef.current.value);
    this.userNameRef.current.focus();
  };

  handleSubmit = event => {
    //阻止默认行为
    event.preventDefault();
    console.log("阻止了提交行为", this.state.form);
  };

  handleInputChange = event => {
    const form = { ...this.state.form };
    const input = event.currentTarget;
    form[input.name] = input.value;
    this.setState({ form });
  };

  render() {
    return (
      <div>
        <h1>LoginForm</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={this.state.form.username}
            onChange={this.handleInputChange}
            label="用户名"
            type="text"
          />
          <Input
            name="password"
            value={this.state.form.password}
            onChange={this.handleInputChange}
            label="密码"
            type="password"
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

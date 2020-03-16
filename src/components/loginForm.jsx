import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    form: {
      username: "",
      password: ""
    },
    errors: {}
  };

  //表单校验规则 使用Joi
  schema = {
    username: Joi.string()
      .required()
      .label("用户名"),
    password: Joi.string()
      .required()
      .label("密码")
  };

  //创建一个ref 用于返回对应绑定的dom对象 但不推荐使用ref
  userNameRef = React.createRef();
  //测试ref的使用
  testRef = () => {
    //通过ref获取UserName输入框的dom对象 对象的value值便是Username的值
    console.log(this.userNameRef.current.value);
    this.userNameRef.current.focus();
  };

  doSubmit = () => {
    // 校验数据
    const errors = this.validate() || {};
    this.setState({ errors });
    if (errors) {
      console.log("登录失败");
    }
  };

  render() {
    return (
      <div>
        <h1>LoginForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "text", "用户名")}
          {this.renderInput("password", "password", "密码")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

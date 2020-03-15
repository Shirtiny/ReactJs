import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    form: {
      username: "",
      password: ""
    },
    errors: {
      username: "",
      password: ""
    }
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

  handleSubmit = event => {
    //阻止默认行为
    event.preventDefault();
    console.log("阻止了提交行为", this.state.form);
    this.doSubmit();
  };

  doSubmit = () => {
    // 校验数据
    const errors = this.validate() || {};
    this.setState({ errors });
    if (errors) {
      console.log("登录失败");
    }
  };

  handleInputChange = event => {
    const form = { ...this.state.form };
    const input = event.currentTarget;
    form[input.name] = input.value;
    //错误提示
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input.name, input.value);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.setState({ form, errors });
  };

  //整个表单数据的校验
  validate = () => {
    //配置项 关闭提前中断 收集所有校验错误
    const option = { abortEarly: false };
    //校验结果
    const result = Joi.validate(this.state.form, this.schema, option);
    //如果校验通过 无错误 结束方法 返回空对象
    if (!result.error) return null;
    //有错误 则
    // console.log("校验结果：", result.error.details);
    let errors = {};
    //给errors赋值
    for (let detail of result.error.details) {
      let path = detail.path[0];
      errors[path] = detail.message;
    }
    return errors;
  };

  //单个属性的校验
  validateProperty = (name, value) => {
    const obj = { [name]: value };
    //编写校验规则 动态引用总规则的一条
    const schema = {
      [name]: this.schema[name]
    };
    //校验结果
    const result = Joi.validate(obj, schema);
    //如果校验通过 无错误 结束方法 返回空对象
    if (!result.error) return null;
    //有错误 则
    // console.log("校验结果：", result.error.details);
    else return result.error.details[0].message;
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
            error={this.state.errors.username}
          />
          <Input
            name="password"
            value={this.state.form.password}
            onChange={this.handleInputChange}
            label="密码"
            type="password"
            error={this.state.errors.password}
          />
          <button className="btn btn-primary" disabled={this.validate()}>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

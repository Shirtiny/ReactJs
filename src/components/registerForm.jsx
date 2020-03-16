import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    form: {
      email: "",
      password: "",
      nickname: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("邮箱"),
    password: Joi.string()
      .min(5)
      .required()
      .label("密码"),
    nickname: Joi.string()
      .required()
      .label("昵称")
  };

  doSubmit = () => {
    console.log("处理注册");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "email", "邮箱")}
          {this.renderInput("password", "password", "密码")}
          {this.renderInput("nickname", "nickname", "昵称")}
          {this.renderButton("注册")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;

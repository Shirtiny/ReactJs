import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    form: {},
    errors: {}
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

  handleSubmit = event => {
    //阻止默认行为
    event.preventDefault();
    console.log("阻止了提交行为", this.state.form);
    this.doSubmit();
  };

  renderButton = lable => {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {lable}
      </button>
    );
  };

  renderInput = (name, type, label) => {
    const { form, errors } = this.state;
    return (
      <Input
        name={name}
        value={form[name]}
        onChange={this.handleInputChange}
        label={label}
        type={type}
        error={errors[name]}
      />
    );
  };
}

export default Form;

import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import { Validators } from "../../utilities/Validators";
import "./Login.css";
import React, { Component } from "react";

class Login extends Component {
  state = {
    form : {
      username: {value : "" , valid : false,touched : false},
      password: {value : "" , valid : false,touched : false}
    },
    touched: false,
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ touched: true });
    let valid = [];
    for(let key in this.state.form){   
      this.state.form[key].value !== "" && this.state.form[key].valid === true ? valid.push(true) : valid.push(false);  
    }
    const isValid = valid.every(v => v === true)    
    isValid &&  this.props.submitButtonHandler(this.state.form, isValid);
  };

  handleChange = (key) => (value,error) => {
    let updatedValue = {...this.state.form}
    updatedValue[key]= {value :value,valid :!error,touched : true}
    this.setState({form : updatedValue});
  };

  render() {
    return (
      <div className="Login">
        <div className="container my-5">
          <h1 className="display-4 heading">Blog post Login</h1>
          <div className="jumbotron">
            {!this.props.isAuthenticate && this.state.touched && (
              <small className="form-text text-muted textIfFail">
                Please get Approval From Admin Or Check UserName & Password.
              </small>
            )}
            <form className="form" onSubmit={this.submitHandler}>
              <div className="form-group">
                <Input
                  type="text"
                  label="User Name"
                  placeholder="Enter Your User Name"
                  value={this.state.form.username.value}
                  onChange={this.handleChange("username")}
                  validators={[
                    {
                      check: Validators.required,
                      message: "Field Is Required",
                    },
                  ]}
                  touched = {this.state.form.username.touched}
                />
              </div>
              <div className="form-group">
                <Input
                  type="password"
                  label="Password"
                  placeholder="Enter Your Password"
                  value={this.state.form.password.value}
                  onChange={this.handleChange("password")}
                  validators={[
                    {
                      check: Validators.required,
                      message: "Field Is Required",
                    },
                  ]}
                  touched = {this.state.form.password.touched}
                />
              </div>
              <Button>SignUp</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
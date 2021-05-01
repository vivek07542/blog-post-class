import React, { Component } from "react";
import { Validators } from "../../../../utilities/Validators";
import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";

class EditUser extends Component {
  state = {
    form: {
      username: {
        value: this.props.editObject.username,
        valid: true,
        touched: false,
      },
      role: { value: this.props.editObject.role, valid: true, touched: false },
      password: {
        value: this.props.editObject.password,
        valid: true,
        touched: false,
      },
      firstName: {
        value: this.props.editObject.firstName,
        valid: true,
        touched: false,
      },
      lastName: {
        value: this.props.editObject.lastName,
        valid: true,
        touched: false,
      },
      phonenumber: {
        value: this.props.editObject.phonenumber,
        valid: true,
        touched: false,
      },
    },
    touched: false,
  };
  // Input Handler Change
  handleChange = (key) => (value, error) => {
    console.log(key,error);
    let updatedValue = { ...this.state.form };
    updatedValue[key] = { value: value, valid: !error, touched: true };
    this.setState({ form: updatedValue });
  };
  // Submit Button
  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ touched: true });
    let valid = [];
    for (let key in this.state.form) {
      console.log(this.state.form[key])
      this.state.form[key].value !== "" && this.state.form[key].valid === true
        ? valid.push(true)
        : valid.push(false);
    }
    const isValid = valid.every((v) => v === true);
    if (isValid) {
      let values = {};
      values = {
        username: this.state.form.username.value,
        role: this.state.form.role.value,
        password: this.state.form.password.value,
        firstName: this.state.form.firstName.value,
        lastName: this.state.form.lastName.value,
        phonenumber: this.state.form.phonenumber.value,
      };
      this.props.saveButtonHandler(values);
      this.props.changeModeHandler();
    }
  };
  render() {
    const details = (
      <>
        {/* User Name */}
        <label className="col-sm-2 labelText ">User Name:</label>
        <div className="col-sm-4 ">
          <Input
            type="text"
            placeholder="Enter Your User Name"
            value={this.state.form.username.value}
            onChange={this.handleChange("username")}
            validators={[
              {
                    check: Validators.userCheck,
                    message: "User cant be Same",
                  },
              {
                check: Validators.required,
                message: "Please Enter Your User Name",
              },
            ]}
            touched={this.state.form.username.touched}
          />
        </div>
        {/* Password */}
        <label className="col-sm-2 labelText">Password :</label>
        <div className="col-sm-4 ">
          <Input
            type="text"
            placeholder="Enter Your Password"
            value={this.state.form.password.value}
            onChange={this.handleChange("password")}
            validators={[
              {
                check: Validators.required,
                message: "Please Enter Password",
              },
            ]}
            touched={this.state.form.password.touched}
          />
        </div>

        {/* Role */}
        <label className="col-sm-2 labelText">Role :</label>
        <div className="col-sm-4 ">
          <Input
            type="select"
            placeholder="Select Your Gender"
            value={this.state.form.role.value}
            onChange={this.handleChange("role")}
            validators={[
              {
                check: Validators.required,
                message: "Please Enter First Name",
              },
            ]}
            data={[{ name: "user" }, { name: "admin" }]}
          />
        </div>
        {/* First Name */}
        <label className="col-sm-2 labelText">First Name:</label>
        <div className="col-sm-4 ">
          <Input
            type="text"
            placeholder="Enter Your FirstName"
            value={this.state.form.firstName.value}
            onChange={this.handleChange("firstName")}
            validators={[
              {
                check: Validators.required,
                message: "Please Enter First Name",
              },
            ]}
            touched={this.state.form.firstName.touched}
          />
        </div>
        {/* Last Name */}
        <label className="col-sm-2 labelText">Last Name:</label>
        <div className="col-sm-4 ">
          <Input
            type="text"
            placeholder="Enter Your LastName"
            value={this.state.form.lastName.value}
            onChange={this.handleChange("lastName")}
            validators={[
              {
                check: Validators.required,
                message: "Please Enter Last Name",
              },
            ]}
            touched={this.state.form.lastName.touched}
          />
        </div>

        {/* Mobile Number */}
        <label className="col-sm-2 labelText">Mobile Number:</label>
        <div className="col-sm-4 ">
          <Input
            type="text"
            placeholder="Enter Your Mobile Number"
            value={this.state.form.phonenumber.value}
            onChange={this.handleChange("phonenumber")}
            validators={[
              {
                check: Validators.phoneNumber,
                message: "Please Enter Valid Mobile Number",
              },
            ]}
            touched={this.state.form.phonenumber.touched}
          />
        </div>
      </>
    );
    return (
      <div>
        <div className="jumbotron text-center my-5" id="myProfileDiv">
          <div className="form-group row justify-content-across">{details}</div>
          <Button onClick={this.submitHandler}>Save Edit</Button>
        </div>
      </div>
    );
  }
}
export default EditUser;

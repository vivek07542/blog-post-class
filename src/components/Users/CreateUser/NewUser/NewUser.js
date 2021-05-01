import React, { Component } from "react";
import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";
import {Validators} from "../../../../utilities/Validators";

class NewUser extends Component{
    state = {
        form: {
          username: {
            value: "",
            valid: false,
            touched: false,
          },
          role: { value: "user", valid: true, touched: false },
          password: {
            value: "",
            valid: false,
            touched: false,
          },
          firstName: {
            value: "",
            valid: false,
            touched: false,
          },
          lastName: {
            value: "",
            valid: false,
            touched: false,
          },
          phonenumber: {
            value: "",
            valid: false,
            touched: false,
          },
        },
        touched: false,
      };
      // Input Handler Change
      handleChange = (key) => (value, error) => {
          console.log(error)
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
          this.state.form[key].value !== "" && this.state.form[key].valid === true
            ? valid.push(true)
            : valid.push(false);
        }
        console.log(this.state.form)
        console.log(valid);
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
                    message: "User Name Already Exists",
                  },
                  {
                    check: Validators.required,
                    message: "Please Enter UserName",
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
                data={[{ name: "user" }, { name: "admin" }]}
                touched={this.state.form.role.touched}
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
                type="number"
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
export default NewUser; 
// const EditUsers = (props) => {

//     const[editUser,setEditUser] = useState({
//         username: "",
//         role: "",
//         password: "",
//         firstName: "",
//         lastName: "",
//         phonenumber: "",
//     })

//     const[errors,setError] = useState({});
        
//     const inputHandler = event =>{
//         const{name,value} = event.target
//         setEditUser({
//             ...editUser,
//             [name] : value
//         })
//     }

//     const submitHandler = (e) =>{
//         e.preventDefault();
//          const{errors,valid} = validation(editUser);
//          setError(errors);
//         valid && props.saveButtonHandler(editUser);
//         valid && props.changeModeHandler();
//     };

//     const obj = editUser
//     const details = Object.keys(obj).map((key) => {
//         return(
//             <>
//             <label className="col-sm-2 labelText my-3">{key}:</label>
//             <div className="col-sm-4 ">
//               <input
//                 type = {key}
//                 className="form-control my-3"
//                 defaultValue = {obj[key]}
//                 value={editUser.key}
//                 onChange={inputHandler}
//                 placeholder={key}
//                 name = {key}
//               />
//             {errors[key]  && <small className="form-text text-muted textIfFail ">{errors[key]}</small>}
//             </div>
//           </>
//         )
//     });
//     return (
//         <div>
//             <div className="jumbotron text-center my-5" id="myProfileDiv">
//                  <div className="form-group row justify-content-across">
//                      {details}
//                  </div>
//                     <Button onClick={submitHandler}>Save </Button> 
//               </div>
//         </div>      
//     )
// };

// export default EditUsers;
import React, { Component } from "react";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import EditProfile from "./EditProfile/EditProfile";
import {connect} from "react-redux";
import * as loginAction from "../../store/redux/LoginRedux/LoginRedux";

 class MyProfile extends Component {
    state ={
        editMode : false 
    }
    editHandler = () =>{
        this.setState({editMode : true})
    }
    changeModeHandler = () =>{      
      this.setState({editMode : false});
    }
    
  render() {
    return (
      <div >   
        {!this.state.editMode ? 
         <ProfileDetail loggedInUser = {this.props.loggedInUser} editProfileHandler = {this.editHandler}/>
          : <EditProfile loggedInUser = {this.props.loggedInUser} saveButtonHandler = {this.props.onSaveHandler} changeModeHandler = {this.changeModeHandler}/> }
      </div>
    );
  }
}
const mapStateToProps = state =>{
    return{
        // isValid : state.MyProfile.isValid,
        loggedInUser : state.Login.loggedInUser
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onSaveHandler : (values,valid) =>{dispatch(loginAction.saveHandlerInit(values,valid))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyProfile)
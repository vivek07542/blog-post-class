import React, { Component } from 'react'
import Modal from "../../../UI/Modal/Modal";
import EditUsers from "./EditUsers/EditUsers";
import NewUser from "./NewUser/NewUser";

export default class CreateUser extends Component {

    render() {
        const createUser = (
            <div>
            <h3> {this.props.editMode ? "Edit User" : "Create User"}</h3>
            {this.props.editMode ?
             <EditUsers  
                editMode = {this.props.editMode} 
                editObject = {this.props.editObject} 
                saveButtonHandler = {this.props.saveButtonHandler} 
                changeModeHandler = {this.props.modelClosed} 
             /> :
             <NewUser saveButtonHandler = {this.props.saveUserButtonHandler} 
             changeModeHandler = {this.props.modelClosed} />
            }
            

            </div>
        )

        return (
            <div>
                 <Modal show={this.props.activePopup} modelClosed = {this.props.modelClosed}>
                    {createUser}
                </Modal>
            </div>
        )
    }
}

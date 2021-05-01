import React, { Component } from "react";
import Modal from "../../UI/Modal/Modal";
import Button from "../../UI/Button/Button";

export default class SharePost extends Component {
    state = {
       selecteduser : [],
       shareButton : false  
    }
    checkBoxHandler = (event) =>{
        let userName = [...this.state.selecteduser];
        if(event.target.checked){
            userName.push(event.target.value);
        }
        else{
            const editObjIndex = userName.findIndex(user => user === event.target.value);
            userName.splice(editObjIndex, 1);
        }
        if(userName !== null){
          this.setState({shareButton : true});
        }
        this.setState({selecteduser : userName});
    }
    submitHandler = () =>{
        this.props.saveButtonHandler(this.state.selecteduser,this.props.selectedPost);
        this.props.modelClosed();
    }
  render() {
    const users = this.props.usersDetail.map((user) => {
      if (user.role !== "admin" && user.username !== this.props.selectedPost.username) {
        return (
          <div key={user.username} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              onClick = {(event)=>this.checkBoxHandler(event)}
              value={user.username}
            />
            <label className="form-check-label" >
              {user.username}
            </label>
          </div>
        );
      }
      return false;
    });
    return (
      <div>
        <Modal
          show={this.props.activePopup}
          modelClosed={this.props.modelClosed}
        >
          <div>
            <div className="jumbotron text-center my-5" id="myProfileDiv">
              <h4 className="display-4">Share Post</h4>
              <div>{users}</div>
              <Button disabled={!this.state.shareButton} className = "my-2" onClick={this.submitHandler}>Share</Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

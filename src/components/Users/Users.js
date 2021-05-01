import React, { Component } from 'react'
import { connect } from 'react-redux';
import "./Users.css";
import UserList from "./UserList/UserList";
import CreateUser from "./CreateUser/CreateUser";
import Pagination from "../../UI/Pagination/Pagination";
// import Sort from "../../UI/Sort/Sort";
import Button from "../../UI/Button/Button"
import ImportExportOutlinedIcon from '@material-ui/icons/ImportExportOutlined';
import * as loginAction from "../../store/redux/LoginRedux/LoginRedux";

class Users extends Component {
    state = {
        ediMode : false,
        activePopup : false,
        currentPage : 1,
        postPerPage : 5,
        sortType : "asc"
    }
    EditHandler = (username) =>{
        this.setState({activePopup : true,editMode : true})
        this.props.onEditHandler(username);
    }
    createHandler = () =>{
        this.setState({activePopup : true,editMode : false})
    }
    modelClicked = () =>{
        this.setState({activePopup : false,editMode : false})
    }
    paginate = (pageNumbers) =>{
        this.setState({currentPage : pageNumbers})
    }
    pageSelect = (pagePerPost) =>{
        this.setState({postPerPage : pagePerPost})
    }
    onSort = ()=>{
        this.state.sortType === "asc" ? this.setState({sortType : "desc"}) : this.setState({sortType : "asc"})      
    }
    render() {
        const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
        const indexOfFirstPost = indexOfLastPost -  this.state.postPerPage;
        let reverseDetail = this.props.usersDetail.reverse();
        const currentPosts = reverseDetail.slice(indexOfFirstPost,indexOfLastPost)
        const sortedArray = currentPosts.sort((a,b)=>{
            const isReversed = (this.state.sortType === "asc") ? 1 : -1;
            return isReversed* a.firstName.localeCompare(b.firstName)
        });
        let users = (
            sortedArray.map(details =>{
                return(
                    <UserList 
                    key = {details.username}
                    username = {details.username}
                    password = {details.password}
                    firstName = {details.firstName}
                    lastName= {details.lastName}
                    role = {details.role}
                    phonenumber = {details.phonenumber}
                    editClick = {(username)=>this.EditHandler(username)}
                    deleteClick = {this.props.onDeleteHandler}
                />
                )
            })
        )
        return (
            <div>
            <div className="jumbotron text-center my-5">
            <div>
                <Button className="my-4 float-right" onClick={this.createHandler}>Create User</Button>
            </div>
            <div id="tableBox row">             
                    <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th><span>First Name</span> 
                        <Button className = "btn-sm" onClick ={()=>this.onSort()}><ImportExportOutlinedIcon fontSize="small"/></Button>
                       </th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>   
                </thead>
                        {users}
                    </table>
                </div>
                <div className="pageNumbers col-12" id="pagination3">
                    <Pagination pageSelect = {this.pageSelect} paginate = {this.paginate} currentPage = {this.state.currentPage} postPerPage = {this.state.postPerPage} totalPosts={this.props.usersDetail.length}/>
                </div>            
            </div>
            {this.state.activePopup && <CreateUser 
            editObject={this.props.editObject} 
            activePopup = {this.state.activePopup} 
            editMode = {this.state.editMode}
            saveButtonHandler ={this.props.onSaveButtonHandler}
            saveUserButtonHandler = {this.props.onSaveUserButtonHandler}
            modelClosed = {this.modelClicked}    
            />}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        editObject : state.Login.editObject,
        usersDetail : state.Login.usersDetail
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onEditHandler : (username)=>{dispatch(loginAction.editUserHandlerInit(username))},
        onDeleteHandler : (username)=>{dispatch(loginAction.deleteUserHandlerInit(username))},
        onSaveButtonHandler : (editUser) =>{dispatch(loginAction.saveUserHandlerInit(editUser))},
        onSaveUserButtonHandler : (editUser) =>{dispatch(loginAction.createUserHandlerInit(editUser))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Users);
import React, { Component } from 'react'
import Button from "../../../UI/Button/Button";

export default class UserList extends Component {
    
    editHandler =() =>{
        this.props.editClick(this.props.username)
    }
    deleteHandler = () =>{
        this.props.deleteClick(this.props.username);
    }
    render() {
        let eachChild = (
            <tr key={this.props.username}>
                <td>{this.props.username}</td>
                <td>{this.props.password}</td>
                <td>{this.props.role}</td>
                <td>{this.props.firstName}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.phonenumber}</td>
                <td>
                    <Button className = "btn-sm" onClick = {this.editHandler}>Edit</Button>
                </td>
                <td>
                    <Button className = "btn-sm" onClick = {this.deleteHandler}>Delete</Button>
                </td>
            </tr>
        )
        return (
            <>
                <tbody>
                    {eachChild}
                </tbody>
            </>
        )
    }
}

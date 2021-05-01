import React, { Component } from "react";
import "./Profile.css";
import "../../App.css";
import "../../components/MyProfile/MyProfile";
import MyProfile from "../../components/MyProfile/MyProfile";
import Users from "../../components/Users/Users";
export default class Profile extends Component {
  state = {
    toggleTab: 1,
  };

  toggleTabClick = (index) => {
    this.setState({ toggleTab: index });
  };
  render() {
    return (
      <div>
        <div className="row verticalTab" >
          <div className="col-2 tabDivs">
            <div className="row">
              <button
                className={
                  this.state.toggleTab === 1
                    ? "tabss active-tabss btn"
                    : "tabss btn"
                }
                onClick={() => this.toggleTabClick(1)}
              >
                My Profile
              </button>
            </div>
            {this.props.loggedInUser.role === "admin" && (
              <div className="row">
                <button
                  className={
                    this.state.toggleTab === 2
                      ? "tabss active-tabss btn"
                      : "tabss btn"
                  }
                  onClick={() => this.toggleTabClick(2)}
                >
                  Users
                </button>
              </div>
            )}
          </div>

          <div className="col-10">
            <div className="row content-tabs">
              <div
                className={
                  this.state.toggleTab === 1
                    ? "contents  active-contents"
                    : "contents"
                }
              >
                <div className ="row headingColor justify-content-center">
                <h2 className="heading ">Logged In User Detail</h2>
                </div>
                <hr />
                <MyProfile loggedInUser = {this.props.loggedInUser}/>
              </div>
              <div
                className={
                  this.state.toggleTab === 2
                    ? "contents  active-contents"
                    : "contents"
                }
              >
              <div className ="row headingColor justify-content-center">
                <h2 className="heading ">Users Detail</h2>

              </div>
                <hr />
                <Users />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
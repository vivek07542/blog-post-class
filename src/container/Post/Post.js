import React, { Component } from "react";
import "./Post.css";
import AllPost from "../../components/AllPost/AllPost";
import "../../App.css";
import { connect } from "react-redux";
import * as postAction from "../../store/redux/PostRedux/PostRedux";

class Post extends Component {
  state = {
    toggleTab: 2,
  };

  toggleTabClick = (index) => {
    this.setState({ toggleTab: index });
    this.props.onPost(this.props.userPost);
  };

  componentDidMount() {
    this.props.onInitlizer();
  }
  componentDidUpdate(prevProps){
    if(this.props.userPost !== prevProps.userPost){
      this.props.onPost(this.props.userPost);
    }
  }
  render() {
    return (
      <div className="tabDiv">
        <div className="bloc-tabs">
          <button
            className={this.state.toggleTab === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => this.toggleTabClick(1)}
          >
            Pending Post
          </button>
          <button
            className={this.state.toggleTab === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => this.toggleTabClick(2)}
          >
            All Post
          </button>
          {this.props.loggedInUser.role === "admin" && (
            <button
              className={
                this.state.toggleTab === 3 ? "tabs active-tabs" : "tabs"
              }
              onClick={() => this.toggleTabClick(3)}
            >
              Promotional Post
            </button>
          )}
        </div>

        <div className="content-tabs">
          <div
            className={
              this.state.toggleTab === 1 ? "content  active-content" : "content"
            }
          >
            <div className="container">
              <h4 className="display-3 text-center heading">Pending Post</h4>
              <hr />
              <AllPost
                loggedInUser={this.props.loggedInUser}
                approvedPost={this.props.pendingPostArray}
                tabContent = "pendingPost"
              />
            </div>
          </div>

          <div
            className={
              this.state.toggleTab === 2 ? "content  active-content" : "content"
            }
          >
            <div className="container">
              <h4 className="display-3 text-center heading">All Post</h4>
              <hr />
              <AllPost
                loggedInUser={this.props.loggedInUser}
                approvedPost={this.props.approvedPost}
                tabContent = "allPost"
              />
            </div>
          </div>

          <div
            className={
              this.state.toggleTab === 3 ? "content  active-content" : "content"
            }
          >
            <div className="container">
              <h4 className="display-3 text-center heading">Promotional Post</h4>
              <hr />
              <AllPost
                loggedInUser={this.props.loggedInUser}
                approvedPost={this.props.adminPost}
                tabContent = "promotionalPost"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userPost: state.Post.userPost,
    pendingPostArray: state.Post.pendingPostArray,
    approvedPost: state.Post.approvedPost,
    adminPost: state.Post.adminPost,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitlizer: () => {
      dispatch(postAction.initializePostInit());
    },
    onPost: (userPost) => {
      dispatch(postAction.postClickInit(userPost));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);

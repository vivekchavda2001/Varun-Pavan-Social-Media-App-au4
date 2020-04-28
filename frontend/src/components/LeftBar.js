import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    userId: state.app.userId,

  };
};

class LeftBar extends Component {
  state = {
    data: {},
    dataReceived: false,
  };
  componentDidMount() {
    // let data = axios.get('http://localhost:3010/users/5e88f56e7eba1e1c792efb5a');
    let data = axios.get(
      "/users/" + this.props.userId, {
      headers: { 'auth-token': localStorage.getItem('token') }
    }
    );
    data.then((res) => {
      console.log(res)
      this.setState({
        data: res.data.data,
        dataReceived: true,
      });
    });
  }

  render() {
    return (
      <div
        className="pt-5 px-md-2 pr-md-0 px-lg-4 text-center border-right d-none d-md-block "
        style={{ overflowY: "scroll", height: "93vh" }}
      >
        {this.state.dataReceived && (
          <>
            <img
              className="rounded-circle"
              src={this.state.data.profilePic.length > 0 ? this.state.data.profilePic : "http://getdrawings.com/img/facebook-profile-picture-silhouette-female-3.jpg"}
              style={{ width: "12rem" }}
              alt="Profile"
            ></img>
            <Link to={`/${this.state.data._id}`}>
              <h6 className="mt-2">{this.state.data.name}</h6>
            </Link>
            <h6>Followers ({this.state.data.followers.length - 1})</h6>
            <h6>Following ({this.state.data.following.length - 1})</h6>
          </>
        )}
      </div>
    );
  }
}



export default connect(mapStateToProps)(LeftBar);

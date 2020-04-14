import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

class LeftBar extends Component {
  state = {
    data: {},
    dataReceived: false
  }
  componentDidMount() {
    // let data = axios.get('http://localhost:3010/users/5e88f56e7eba1e1c792efb5a');
    let data = axios.get('http://localhost:3010/users/5e931261f6539324ecbe4576');
    data.then(res => {
      console.log(res.data.data)
      this.setState({
        data: res.data.data,
        dataReceived: true
      });
    });
  }
  render() {
    return (
      <div className="pt-5 px-5 text-center border-right" style={{ overflowY: 'scroll', height: '95vh' }}>
        {this.state.dataReceived && (
          <>
            <img className="rounded-circle" src="http://getdrawings.com/img/facebook-profile-picture-silhouette-female-3.jpg" style={{ width: "12rem" }} alt="Profile"></img>
            <h6>{this.state.data.name}</h6>
            <h6>Followers ({this.state.data.followers.length})</h6>
            <h6>Following ({this.state.data.following.length})</h6>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(LeftBar);
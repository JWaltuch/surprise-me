import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {me} from '../store/index.js';
import Wishlist from './wishlist.js';
import axios from 'axios';

class SecretWishlist extends Component {
  constructor(props) {
    super(props);
    this.username = props.match.params.username;
    this.state = {users: []};
  }

  async componentDidMount() {
    this.props.loadInitialData();
    const {data} = await axios.get('/api/users');
    //sets usernames on the state as an array, for easy mapping
    this.setState({users: Object.keys(data)});
  }

  render() {
    return (
      <div className="box">
        {this.state.users.includes(this.username) ? (
          <div>
            {this.username !== this.props.currentUser ? (
              <div>
                <h1>Choose something to make {this.username}'s day!</h1>
                <Wishlist currentUser={this.props.currentUser} />
              </div>
            ) : (
              <div>
                You're spoiling all the fun! You can't see what people are
                getting you! Go away!
              </div>
            )}
          </div>
        ) : (
          <div>
            That user does not exist. Use the navbar to find what you're looking
            for!
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    currentUser: state.user.displayName,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(SecretWishlist));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, UserHome } from './components';
import AddItem from './components/add-item';
import UpdateItem from './components/update-item';
import SecretWishlist from './components/secret-wishlist';
import Users from './components/users';
import { me } from './store';
import firebase from '../server/firebase';

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props) {
    super(props);
    // this.isLoggedIn = null
  }
  componentDidMount() {
    this.props.loadInitialData();
    // console.log(firebase.auth())
    // this.isLoggedIn = firebase.auth().currentUser
    // console.log(this.isLoggedIn)
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/">
              {<Redirect to="/home" />}
            </Route>
            <Route path="/home" component={UserHome} />
            <Route path="/users" component={Users} />
            <Route path="/:username/add" component={AddItem} />
            <Route path="/:username/update/:id" component={UpdateItem} />
            <Route path="/:username" component={SecretWishlist} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.displayName,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

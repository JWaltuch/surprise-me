import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Wishlist from './wishlist';
import Promises from './promises';

export const UserHome = (props) => {
  const { displayName } = props;

  return (
    <div className="box">
      <h1 className="center-text">Hello, {displayName}!</h1>
      <div className="homepage-container">
        <div>
          <h2 className="center-text">My Wishlist:</h2>
          <Wishlist currentUser={displayName} />
        </div>
        <div>
          <h2 className="center-text">My Promises:</h2>
          <Promises currentUser={displayName} />
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    displayName: state.user.displayName,
  };
};

export default connect(mapState)(UserHome);

UserHome.propTypes = {
  displayName: PropTypes.string,
};

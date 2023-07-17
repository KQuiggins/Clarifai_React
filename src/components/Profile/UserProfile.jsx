import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const UserProfile = ({ user }) => {




    return (
      <div className="tc">
        <h2>User Profile</h2>
        <p>ID: {user._id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Joined: {user.joined}</p>
      </div>
    );
  };


UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
  };


export default UserProfile;

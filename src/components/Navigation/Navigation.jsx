import React from "react";
import PropTypes from "prop-types";

const Navigation = ({ onRouteChange, isSignedIn }) => {


  if (isSignedIn) {
    return (
      <nav className="flex justify-between">
        <p
          onClick={() => onRouteChange("signout")}
          className="f3 link dim no-underline pa3 pointer"
        >
          Sign Out
        </p>
        <p
          onClick={() => onRouteChange("profile")}
          className="f3 link dim no-underline pa3 pointer"
        >
          Profile
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="flex flex-row justify-end">
        <p
          onClick={() => onRouteChange("signin")}
          className="f3 link dim no-underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim no-underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

Navigation.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
};

export default Navigation;

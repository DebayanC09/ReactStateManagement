import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "../styles/SpinnerStyle.css"; // Import the CSS for styling

const Loader = () => {
  return (
    <div className="spinner_center">
      <Spinner animation="grow" variant="primary" />
    </div>
  );
};

export default Loader;

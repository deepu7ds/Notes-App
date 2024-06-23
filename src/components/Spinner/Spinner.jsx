import React from "react";
import "./spinner.css"; // Make sure to create a corresponding CSS file

const Spinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <div className="loading-text">Loading</div> {/* Added class here */}
  </div>
);

export default Spinner;

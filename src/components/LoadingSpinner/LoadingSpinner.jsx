import React from "react";
import "./loadingSpinner.css"; // Make sure to create a corresponding CSS file

const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner"></div>
    <div className="loading-text">Loading</div> {/* Added class here */}
  </div>
);

export default LoadingSpinner;

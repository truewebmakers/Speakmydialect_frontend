import React from "react";
import "./NoDataFound.css"; // Import your CSS file

const NoDataFound = () => {
  return (
    <div className="no-data-container">
      <h4 className="no-data-title">No Data Found</h4>
      <p className="no-data-subtitle">
        It seems you haven't searched for anything yet!
      </p>
      <p className="no-data-message">
        Why not take a moment to explore? Start searching for what you need!
      </p>
    </div>
  );
};

export default NoDataFound;

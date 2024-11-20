import React from "react";
import "./NoDataFound.css"; // Import your CSS file

const NoDataFound = () => {
  return (
    <div className="no-data-container">
      {/* Image section */}
      <div className="no-data-image">
        <img
          src="/images/icon/error-page-img.svg"
          alt="No Data Found"
          className="no-data-img" // Optional: use a class to style the image
          width={200}
          height={200}
        />
      </div>

      {/* Text sections */}
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

import React from "react";
import { useLocation } from "react-router-dom";

export default function Search1({ setSearch, search, placeholder }) {
  const { pathname } = useLocation();

  return (
    <>
      <div
        className={`default-box-shadow1 ${
          pathname === "/service-1" ? "mb15" : ""
        }`}
      >
        <div className="search_area">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder={placeholder}
          />
          <label>
            <span className="flaticon-loupe" />
          </label>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";

export default function SelectInput({
  label,
  defaultSelect,
  data = [],
  handler,
  disable,
}) {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredData, setFilteredData] = useState(data); // State for filtered data

  // Update the filteredData when the searchTerm changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredData(
      data.filter((item) =>
        item.option.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="form-style1">
      <label
        className={disable ? "form-label" : "heading-color ff-heading fw500 mb10"}
      >
        {label}
      </label>
      <div className="bootselect-multiselect">
        <div className="dropdown bootstrap-select">
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-bs-toggle="dropdown"
            disabled={disable}
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">
                  {defaultSelect?.option}
                </div>
              </div>
            </div>
          </button>
          <div className="dropdown-menu">
            <div className="inner show" style={{ maxHeight: "300px", overflowX: "auto" }}>
              {/* Add the search input */}
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search ..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <ul className="dropdown-menu inner show">
                {filteredData?.map((item, i) => (
                  <li
                    key={i}
                    className={`${defaultSelect?.value !== null && item?.value === defaultSelect?.value ? "selected active" : ""}`}
                  >
                    <a
                      onClick={() => {
                        if (item?.disabled) return; // Prevent handler from being triggered
                        handler(item?.option, item?.value);
                      }}
                      className={`dropdown-item ${item?.disabled ? "disabled" : ""}`}
                      style={item?.disabled ? { pointerEvents: "none", opacity: 0.6 } : {}}
                    >
                      <span className="text">{item?.option}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

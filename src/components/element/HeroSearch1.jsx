import { apiMethods, apiUrls, routes } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import listingStore from "@/store/listingStore";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HeroSearch1({ isSearchingPage, searchValue }) {
  const params = useLocation();
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [searchValueState, setSearchValue] = useState(searchValue || "");
  const [searchingList, setSearchingList] = useState([]);
  const setSpeak = listingStore((state) => state.setSpeak);
  const navigate = useNavigate();

  const focusDropdown = () => {
    setSearchDropdownOpen(true);
  };

  useEffect(() => {
    setSearchValue(searchValue); // Update local state when searchValue changes
  }, [searchValue]);

  const blurDropdown = () => {
    setTimeout(() => {
      setSearchDropdownOpen(false);
    }, 200);
  };

  const selectSearch = (select) => {
    setSearchValue(select);
    setSearchDropdownOpen(false);
  };

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value?.length > 2) {
      getSearchSuggestions(value);
    } else {
      setSearchingList([]);
    }
  };

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, timeout);
    };
  }

  const getSearchSuggestions = useCallback(
    debounce(async (value) => {
      try {
        const { data } = await UseApi(
          apiUrls.getSearchingSuggestions + value,
          apiMethods.GET
        );
        if (data?.status === true || data?.status == 200) {
          const searhingData = data?.data;
          setSearchingList(searhingData);
        }
      } catch (error) {
        toast.error("Error fetching suggestions");
      }
    }, 300),
    []
  );

  const handleSearchClick = async () => {
    if (searchValueState) {
      setSpeak(searchValueState);
      const params = new URLSearchParams(window.location.search);
      params.delete("language");
      params.set("language", searchValueState);

      navigate({
        pathname: routes.Search,
        search: `?${params.toString()}`,
      });
    }
  };

  return !isSearchingPage ? (
    <>
      <div className="col-md-9 col-lg-9 col-xl-9">
        <div className="advance-search-field mb10-sm bdrr1 bdrn-sm">
          <form className="form-search position-relative">
            <div className="box-search">
              <span className="icon far fa-magnifying-glass" />
              <input
                className="form-control"
                type="text"
                name="search"
                placeholder={"Search For Languages"}
                onFocus={focusDropdown}
                onBlur={blurDropdown}
                autoComplete="off"
                value={searchValueState}
                onChange={onSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchValueState !== "")
                    handleSearchClick();
                }}
              />
              {searchingList?.length > 0 && (
                <div
                  className="search-suggestions"
                  style={{
                    visibility: isSearchDropdownOpen ? "visible" : "hidden",
                    opacity: isSearchDropdownOpen ? "1" : "0",
                    top: isSearchDropdownOpen ? "70px" : "100px",
                  }}
                >
                  <h6 className="fz14 ml30 mt25 mb-3">Popular Search</h6>
                  <div className="box-suggestions">
                    <ul className="px-0 m-0 pb-4">
                      {searchingList?.map((item, index) => (
                        <li
                          key={index}
                          className={
                            searchValueState === item?.name
                              ? "ui-list-active"
                              : ""
                          }
                        >
                          <div className="info-product cursor-pointer">
                            <div
                              className="item_title"
                              onClick={() => selectSearch(item?.name)}
                            >
                              {item?.name}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-5 col-lg-3 col-xl-3 ps-md-0">
        <div className="text-center text-xl-end">
          <button
            onClick={handleSearchClick}
            className="ud-btn btn-thm w-100 px-4"
            type="button"
            disabled={!searchValueState?.length > 0} // Disable button if no suggestion is selected
          >
            Search
          </button>
        </div>
      </div>
    </>
  ) : (
    <div
      className="advance-search-field mb10-sm bdrr1 bdrn-sm"
      style={{ position: "relative" }}
    >
      <form className="form-search position-relative">
        <div className="box-search" style={{ position: "relative" }}>
          <span className="icon far fa-magnifying-glass" />
          <input
            className="form-control"
            type="text"
            name="search"
            placeholder={"Search For Languages"}
            onFocus={focusDropdown}
            onBlur={blurDropdown}
            autoComplete="off"
            value={searchValueState}
            onChange={onSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchValueState !== "")
                handleSearchClick();
            }}
            style={{ paddingRight: "50px" }} // Space for the button inside
          />
          <button
            type="button"
            className="search-btn"
            onClick={handleSearchClick}
            disabled={!searchValueState?.length > 0}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              height: "75%",
              padding: "0 15px",
              border: "none",
              backgroundColor: "#5bbb7b",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
          {searchingList?.length > 0 && (
            <div
              className="search-suggestions"
              style={{
                position: "absolute",
                zIndex: 9999, // Ensures it's on top of other components
                top: "70px", // Adjust this based on your input field's height
                left: 0,
                width: "100%",
                backgroundColor: "white",
                visibility: isSearchDropdownOpen ? "visible" : "hidden",
                opacity: isSearchDropdownOpen ? "1" : "0",
                border: "1px solid #ccc",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional: for a subtle shadow effect
                maxHeight: "300px", // Set max height for scrolling
                overflowY: "auto", // Enable vertical scroll
              }}
            >
              <h6 className="fz14 ml30 mt25 mb-3">Popular Search</h6>
              <div className="box-suggestions">
                <ul className="px-0 m-0 pb-4">
                  {searchingList?.map((item, index) => (
                    <li
                      key={index}
                      className={
                        searchValueState === item?.name ? "ui-list-active" : ""
                      }
                    >
                      <div className="info-product cursor-pointer">
                        <div
                          className="item_title"
                          onClick={() => selectSearch(item?.name)}
                        >
                          {item?.name}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

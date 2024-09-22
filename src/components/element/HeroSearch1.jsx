import { apiMethods, apiUrls, routes } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import listingStore from "@/store/listingStore";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HeroSearch1({ isSearchingPage }) {
  const params = useLocation();
  const [isSearchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchingList, setSearchingList] = useState([]);
  const setSpeak = listingStore((state) => state.setSpeak);
  const navigate = useNavigate();

  const focusDropdown = () => {
    setSearchDropdownOpen(true);
  };

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
    if (searchValue) {
      setSpeak(searchValue);
      const params = new URLSearchParams(window.location.search);
      params.delete("language");
      params.set("language", searchValue);

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
                value={searchValue}
                onChange={onSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchValue !== "")
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
                            searchValue === item?.name ? "ui-list-active" : ""
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
            disabled={!searchValue?.length > 0} // Disable button if no suggestion is selected
          >
            Search
          </button>
        </div>
      </div>
    </>
  ) : (
    <div className="advance-search-tab bgc-white p10 bdrs4 zi1 position-relative">
      <div className="row">
        <div className="col-md-8 col-xl-9">
          <div className="advance-search-field ">
            <form className="form-search position-relative">
              <div className="box-search bb1-sm">
                <span className="icon far fa-magnifying-glass" />
                <input
                  className="form-control"
                  type="text"
                  name="search"
                  placeholder={"Search For Languages"}
                  onFocus={focusDropdown}
                  onBlur={blurDropdown}
                  autoComplete="off"
                  value={searchValue}
                  onChange={onSearchChange}
                />
                {searchingList?.length > 0 && (
                  <div
                    className="search-suggestions"
                    style={{
                      visibility: isSearchDropdownOpen ? "visible" : "hidden",
                      opacity: isSearchDropdownOpen ? "1" : "0",
                      top: isSearchDropdownOpen ? "70px" : "100px",
                      zIndex: 120001,
                      position: "absolute",
                      border: "1px solid black",
                    }}
                  >
                    <h6 className="fz14 ml30 mt25 mb-3">Popular Search</h6>
                    <div className="box-suggestions">
                      <ul className="px-0 m-0 pb-4">
                        {searchingList?.map((item, index) => (
                          <li
                            key={index}
                            className={
                              searchValue === item?.name ? "ui-list-active" : ""
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
        <div className="col-md-4 col-xl-3">
          <div className="text-center text-xl-start">
            <button
              onClick={handleSearchClick}
              className="ud-btn btn-thm w-100 px-4"
              type="button"
              disabled={!searchValue?.length > 0} // Disable button if no suggestion is selected
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

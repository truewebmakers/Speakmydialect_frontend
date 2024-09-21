import { useEffect, useState } from "react";
import ClearButton from "../button/ClearButton";
import BudgetOption2 from "../option/BudgetOption2";
import CategoryOption1 from "../option/CategoryOption1";
import LocationOption1 from "../option/LocationOption1";
import ProjectTypeOption1 from "../option/ProjectTypeOption1";
import SpeakOption1 from "../option/SpeakOption1";
import { getCountries, getLanguages } from "@/utils/commonFunctions";

export default function ListingSidebar2() {
  const [countryList, setCountryList] = useState([]);
  const [languageListing, setLanguageListing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedCountries = sessionStorage.getItem("countries");
      const storedLanguages = sessionStorage.getItem("languages");
      if (storedCountries?.length > 0) {
        setCountryList(JSON.parse(storedCountries));
      } else {
        await getCountries(setCountryList);
      }
      if (storedLanguages?.length > 0) {
        setLanguageListing(JSON.parse(storedLanguages));
      } else {
        await getLanguages(setLanguageListing);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="list-sidebar-style1 d-none d-lg-block">
        <div className="accordion" id="accordionExample">
          <div className="card mb20 pb10 mt-0">
            <h4>Level</h4>
            <div
              id="collapse0"
              className="collapse show"
              aria-labelledby="heading0"
              data-parent="#accordionExample"
            >
              <div className="card-body card-body px-0 pt-0">
                <CategoryOption1 />
              </div>
            </div>
          </div>

          <div className="card mb20 pb5">
            <h4>Location</h4>
            <div
              id="collapse2"
              className="collapse show"
              aria-labelledby="heading2"
              data-parent="#accordionExample"
            >
              <div className="card-body card-body px-0 pt-0">
                <LocationOption1 data={countryList} />
              </div>
            </div>
          </div>
          <div className="card mb20 pb5">
            <h4>Languange</h4>
            <div
              id="collapse3"
              className="collapse show"
              aria-labelledby="heading3"
              data-parent="#accordionExample"
            >
              <div className="card-body card-body px-0 pt-0">
                <SpeakOption1 data={languageListing} />
              </div>
            </div>
          </div>
        </div>
        <ClearButton />
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import ClearButton from "../button/ClearButton";
import LocationOption1 from "../option/LocationOption1";
import SpeakOption1 from "../option/SpeakOption1";
import {
  getCountries,
  getLanguagesForCountry,
  getSelectedDialect,
} from "@/utils/commonFunctions";
import DialectOption1 from "../option/DialectOption";
import { CountryMList } from "@/constants/CountryList";
import LocationSelection from "../option/LocationsOption1";

export default function ListingSidebar2() {
  const [countryList, setCountryList] = useState([
    "Africa",
    "Burma",
    "China",
    "India",
    "Iran",
    "Philippines",
    "Samoa",
    "Cambodia",
  ]);
  const [languageListing, setLanguageListing] = useState([]);
  const [dialectListing, setDialectListing] = useState([]);
  const [speakId, setSpeakId] = useState(0);
  const [countryId, setCountryId] = useState(0);

  useEffect(() => {
    const fetchCountryData = async () => {
      const storedCountries = sessionStorage.getItem("countries");

      if (storedCountries?.length > 0) {
        setCountryList(JSON.parse(storedCountries));
      } else {
        getCountries(setCountryList);
      }
    };
    fetchCountryData();
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const countryName =
        CountryMList.find((c) => c.id === countryId)?.id || null;
      if (countryName) {
        const langs = getLanguagesForCountry(countryName); // returns [{ id, name }]
        setLanguageListing(langs || []);
      } else {
        setLanguageListing([]);
      }
    };
    fetchData();
  }, [countryId]);

  useEffect(() => {
    const fetchData = async () => {
      await getSelectedDialect(setDialectListing, speakId);
    };
    fetchData();
  }, [speakId]);

  return (
    <>
      <div className="list-sidebar-style1 d-none d-lg-block">
        <div className="accordion" id="accordionExample">
          {/* <div className="card mb20 mt-0">
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
          </div> */}

          <div className="card mb20">
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
          <div className="card mb20">
            <h4>Country</h4>
            <div
              id="collapse3"
              className="collapse show"
              aria-labelledby="heading3"
              data-parent="#accordionExample"
            >
              <div
                className="card-body card-body px-0 pt-0"
                style={{ marginTop: "-25px" }}
              >
                <LocationSelection
                  data={CountryMList}
                  setCountryId={setCountryId}
                  setSpeakId={setSpeakId}
                  label="Select Country"
                />
              </div>
            </div>
          </div>
          <div className="card mb20">
            <h4>Languange</h4>
            <div
              id="collapse3"
              className="collapse show"
              aria-labelledby="heading3"
              data-parent="#accordionExample"
            >
              <div
                className="card-body card-body px-0 pt-0"
                style={{ marginTop: "-25px" }}
              >
                <SpeakOption1
                  data={languageListing}
                  setSpeakId={setSpeakId}
                  label="Select Languange"
                />
              </div>
            </div>
          </div>
         
          <div className="card mb20">
            <h4>Dialect</h4>
            <div
              id="collapse3"
              className="collapse show"
              aria-labelledby="heading3"
              data-parent="#accordionExample"
            >
              <div
                className="card-body card-body px-0 pt-0"
                style={{ marginTop: "-25px" }}
              >
                <DialectOption1 data={dialectListing} />
               
              </div>
            </div>
          </div>
        </div> 
        <ClearButton />
      </div>
    </>
  );
}

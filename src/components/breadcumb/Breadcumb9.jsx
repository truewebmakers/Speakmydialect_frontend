import React from "react";
import HeroSearch1 from "../element/HeroSearch1";

export default function Breadcumb9({ searchValue }) {
  // Accept searchValue as a prop
  return (
    <>
      <section className="breadcumb-section pt-0">
        <div className="cta-service-v1 cta-banner mx-auto maxw1700 pt120 pb120 bdrs16 position-relative d-flex align-items-center mx20-lg px30-lg">
          <img
            className="left-top-img wow zoomIn"
            src="/images/vector-img/left-top.png"
            alt="left-top"
          />
          <img
            className="right-bottom-img wow zoomIn"
            src="/images/vector-img/right-bottom.png"
            alt="right-bottom"
          />
          <img
            className="service-v1-vector bounce-y d-none d-xl-block"
            src="/images/vector-img/vector-service-v1n.png"
            alt="vector-service"
          />
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-7">
                <div className="position-relative">
                  <h2>Search Results</h2>
                </div>
                <HeroSearch1 isSearchingPage={true} searchValue={searchValue} />{" "}
                {/* Pass searchValue to HeroSearch1 */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

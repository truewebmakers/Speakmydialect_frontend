import React from "react";
import HeroSearch1 from "../element/HeroSearch1";
import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";
import ContactInfo1 from "@/components/section/ContactInfo1";
export default function Breadcumb9({ searchValue }) {
  // Accept searchValue as a prop
  return (
  <>
    <section className="wow fadeInUp">
        <div className="cta-commmon-v1 cta-banner bgc-thm2 mx-auto maxw1700 pt120 pb120 bdrs16 position-relative  asd d-flex align-items-center mx20-lg">
          <img
            className="left-top-img wow zoomIn" 
            src="/images/vector-img/left-top.png"
            alt="object 1"
          />
          <img
            className="right-bottom-img wow zoomIn"
            src="/images/vector-img/right-bottom.png"
            alt="object 2"
          />
          <div className="container">
            <div className="row">
              <div className="col-xl-5">
                <div
                  className="position-relative wow fadeInUp"
                  data-wow-delay="300ms"
                >
                  <h2 className="text-white">{"Search Results"}</h2>
                  <p className="text mb30 text-white">{""}</p>
                  <HeroSearch1 isSearchingPage={true} searchValue={searchValue} />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
    
      <section className="breadcumb-section pt-0 d-none">
        <div className="cta-service-v1  TEs cta-banner mx-auto maxw1700 pt120 pb120 bdrs16 position-relative d-flex align-items-center mx20-lg px30-lg">
          <img
            className="left-top-img wow zoomIn"
            src="/images/vector-img/left-top.png"
            alt="object 1"
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

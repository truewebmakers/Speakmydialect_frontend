import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { Navigation } from "swiper";

import TrendingServiceCard1 from "../card/TrendingServiceCard1";
import { useEffect, useState } from "react";
import { searchingApi } from "@/hook/searchingApi";
import { useSearchParams } from "react-router-dom";

export default function TrendingService1() {
  const [showSwiper, setShowSwiper] = useState(false);

  const [searchingResult, setSearchingResult] = useState([]);
  const [SearchingResult1, setSearchingResult1] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());
    searchingApi(query).then((data) => setSearchingResult(data));
    setSearchingResult1([]);
    setShowSwiper(true);
  }, [searchParams]);

  return (
    <>
      <section className="pt90 pb120-md bgc-thm3">
        <div className="container">
          <div className="row align-items-center wow fadeInUp">
            <div className="col-lg-9">
              <div className="main-title">
                <h2 className="title">Popular Interpreters</h2>
                <p className="paragraph">
                  Most viewed and all-time top-selling interpreters
                </p>
              </div>
            </div>
          </div>
          <div className="row" style={{ paddingBottom: "25px" }}>
            <div className="col-lg-12">
              <div className="position-relative">
                {showSwiper && (
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    freeMode={true}
                    loop={true}
                    className="mySwiper"
                    navigation={{
                      prevEl: ".prev-btn",
                      nextEl: ".next-btn",
                    }}
                    modules={[Navigation]}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      992: {
                        slidesPerView: 3,
                      },
                      1200: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {searchingResult?.data?.length > 0 &&
                      searchingResult?.data?.map((item, i) => (
                        <SwiperSlide key={i}>
                          <TrendingServiceCard1 data={item} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                )}
                <button type="button" className="prev-btn">
                  <i className="far fa-chevron-left" />
                </button>
                <button type="button" className="next-btn">
                  <i className="far fa-chevron-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

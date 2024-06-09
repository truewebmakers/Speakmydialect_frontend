import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper";
import HeroSearch1 from "../element/HeroSearch1";
import { useNavigate } from "react-router-dom";

const hero = ["/images/home/home-1.webp", "/images/home/home-2.jpg"];

export default function Hero1() {
  const [getSelectedRole, setSelectedRole] = useState(null);

  const navigate = useNavigate();
  // search handler
  const searchHandler = () => {
    navigate("/search");
  };

  const [showSwiper, setShowSwiper] = useState(false);
  useEffect(() => {
    setShowSwiper(true);
  }, []);

  return (
    <>
      <section className="home-one p-0 space-maintain-1">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-banner-wrapper home1_style">
                <div className="ui-hero-slide">
                  {showSwiper && (
                    <Swiper
                      className="mySwiper"
                      loop={true}
                      effect={"fade"}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[EffectFade, Navigation]}
                      navigation={{
                        nextEl: ".right-btn",
                        prevEl: ".left-btn",
                      }}
                    >
                      {hero.map((item, index) => (
                        <SwiperSlide key={index}>
                          <img
                            src={item}
                            className="ui-hero-slide__img"
                            alt="Hero Banner"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                  <div className="carousel-btn-block banner-carousel-btn">
                    <span className="carousel-btn left-btn">
                      <i className="fas fa-chevron-left left" />
                    </span>
                    <span className="carousel-btn right-btn">
                      <i className="fas fa-chevron-right right" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home1-banner-content">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-xxl-7">
                <div className="position-relative">
                  <h3 className="banner-title animate-up-2">
                    Find Trusted Local Interpreters{" "}
                    <br className="d-none d-lg-block" />
                  </h3>
                  <div className="advance-search-tab bgc-white bgct-sm p10 p0-md bdrs4 banner-btn position-relative zi9 animate-up-4">
                    <div className="row">
                      <HeroSearch1 />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React, { useCallback, useEffect, useRef } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import fjGallery from "flickr-justified-gallery";

const LightGalleryComp = () => {
  const lightGallery = useRef(null);
  const onInit = useCallback((detail) => {
    if (detail) {
      lightGallery.current = detail.instance;
    }
  }, []);

  useEffect(() => {
    fjGallery(document.querySelectorAll(".gallery"), {
      itemSelector: ".gallery__item",
      rowHeight: 180,
      lastRow: "start",
      gutter: 2,
      rowHeightTolerance: 0.1,
      calculateItemsHeight: false,
    });
  }, []);

  return (
    <LightGallery
      onInit={onInit}
      plugins={[lgZoom, lgVideo]}
      mode="lg-fade"
      pager={false}
      thumbnail={true}
      galleryId={"nature"}
      autoplayFirstVideo={false}
      elementClassNames={"gallery"}
      mobileSettings={{
        controls: false,
        showCloseIcon: false,
        download: false,
        rotate: false,
      }}
    >
      <a
        data-lg-size="1600-2400"
        data-pinterest-text="Pin it2"
        data-tweet-text="lightGallery slide  2"
        className="gallery__item"
        data-src="https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80"
        data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@therawhunter' >Massimiliano Morosinotto </a></h4><p> Location - <a href='https://unsplash.com/s/photos/tre-cime-di-lavaredo%2C-italia'>Tre Cime di Lavaredo, Italia</a>This is the Way</p>"
      >
        <img
          className="img-responsive"
          height={100}
          width={5}
          src="https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80"
        />
      </a>
      ;
    </LightGallery>
  );
};

export default LightGalleryComp;

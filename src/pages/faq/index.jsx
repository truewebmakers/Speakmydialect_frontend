import FaqPayment from "@/components/section/FaqPayment";
import FaqSuggestion from "@/components/section/FaqSuggestion";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";

export default function FaqPage() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <section className="our-faq pb50">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">Frequently Asked Questions</h2>
                <p className="paragraph mt10">
                  Give your visitor a smooth online experience with a solid UX
                  design
                </p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-8 mx-auto">
              <FaqPayment />
              <FaqSuggestion />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

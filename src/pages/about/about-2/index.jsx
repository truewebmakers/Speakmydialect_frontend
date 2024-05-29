import Breadcumb2 from "@/components/breadcumb/Breadcumb2";

import About1 from "@/components/section/About1";
import CounterInfo1 from "@/components/section/CounterInfo1";
import CtaBanner1 from "@/components/section/CtaBanner1";
import OurFaq1 from "@/components/section/OurFaq1";
import OurFunFact1 from "@/components/section/OurFunFact1";
import OurPartner1 from "@/components/section/OurPartner1";
import Testimonial1 from "@/components/section/Testimonial1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Freeio - Freelance Marketplace ReactJs Template | About 2",
};

export default function AboutPage2() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Breadcumb2
        title="About"
        brief="Give your visitor a smooth online experience with a solid UX design"
      />

      <About1 />
      <CounterInfo1 />
      <CtaBanner1 />
      <OurFunFact1 />
      <Testimonial1 />
      <CtaBanner1 />
      <OurFaq1 />
      <OurPartner1 />
    </>
  );
}

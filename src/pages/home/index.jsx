import Hero1 from "@/components/hero/Hero1";
import CounterInfo1 from "@/components/section/CounterInfo1";
import CtaBanner1 from "@/components/section/CtaBanner1";
import NeedSomething1 from "@/components/section/NeedSomething1";
import Testimonial1 from "@/components/section/Testimonial1";
import TrendingService1 from "@/components/section/TrendingService1";

import MetaComponent from "@/components/common/MetaComponent";
import { metaData } from "@/constants/constant";
import About1 from "@/components/section/About1";
import OurCta1 from "@/components/section/OurCar1";

export default function HomePage1() {
  return (
    <>
      <MetaComponent meta={metaData} />
      <Hero1 />
      <About1/>
      <TrendingService1 />
      <CtaBanner1 />
      <CounterInfo1 active={false}/>
      <NeedSomething1 />
      <OurCta1 />
    </>
  );
}

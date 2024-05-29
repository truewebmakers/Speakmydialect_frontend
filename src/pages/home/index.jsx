import Hero1 from "@/components/hero/Hero1";
import CounterInfo1 from "@/components/section/CounterInfo1";
import CtaBanner1 from "@/components/section/CtaBanner1";
import NeedSomething1 from "@/components/section/NeedSomething1";
import OurBlog1 from "@/components/section/OurBlog1";
import OurPartner1 from "@/components/section/OurPartner1";
import Testimonial1 from "@/components/section/Testimonial1";
import TrendingService1 from "@/components/section/TrendingService1";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Freeio - Freelance Marketplace ReactJs Template | Home 1",
};

export default function HomePage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Hero1 />
      <TrendingService1 />
      <NeedSomething1 />
      <CtaBanner1 />
      <CounterInfo1 />
      <Testimonial1 />
    </>
  );
}

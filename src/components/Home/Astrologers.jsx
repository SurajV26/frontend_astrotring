import ComponentHead from "../ComponentHead";
import Slider from "./Slider";
import { useSelector } from "react-redux";
import CallCard from "../CallCard";

const Astrologers = () => {
  const { allastrologers } = useSelector((state) => state.astroAuth);
  // console.log(astrologer)

  return (
    <section className="pt-10 pb-0 bg-gradient-to-br from-orange-50 via-yellow-100 to-red-100">
      <div className="container">
      <ComponentHead heading="Top Astrologers" title="Connect with our expert astrologers for guidance" />
      <div className="relative pt-10">
      <Slider slideCount={4}>
        {allastrologers?.map((astro) => (
          <CallCard key={astro.id} {...astro} />
        ))}
      </Slider>
      </div>
      </div>
    </section>
  );
};

export default Astrologers;

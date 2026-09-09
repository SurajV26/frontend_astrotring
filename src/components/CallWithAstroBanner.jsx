import { useSelector } from "react-redux";
import CallCard from "./CallCard";
import HeadWithLogo from "./HeadWithLogo";

const CallWithAstroBanner = () => {


  const { allastrologers, loading } = useSelector((state) => state.astroAuth);
// console.log("astros from callwithastrobanner",allastrologers) 

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section className="py-10">
      <div className="container">
        <HeadWithLogo title="Call And Chat with Astrologers" />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10">
          {allastrologers
            .map((astro) => (
              <CallCard key={astro.id} {...astro} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CallWithAstroBanner;

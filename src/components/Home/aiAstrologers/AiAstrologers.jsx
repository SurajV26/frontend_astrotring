import { useNavigate } from "react-router-dom"
import Slider from "../Slider";
import ComponentHead from "@/components/ComponentHead";
import { DUMMY_ASTROLOGERS } from "@/data/dummyAiastrologers/dummyAiastrologers";




const AiAstrologers = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-gradient-to-b from-amber-50 to-white py-4">
      <div className=" mx-auto">
        {/* <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">
          AI Astrologers
        </h2> */}


        <div className="container">
          <ComponentHead heading="AI Astrologers" title="Connect with our expert AI astrologers for guidance" />
          <div className=" pt-4">
          <Slider slideCount={5}>
            {DUMMY_ASTROLOGERS.map((astro) => (
              <div
                key={astro.id}
                onClick={() => navigate(`/ai-astrologer/${astro.id}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                  <img src={astro.image} alt={astro.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{astro.name}</h3>
                  <p className="text-amber-600 font-bold mt-1">₹{astro.price}/msg</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        </div>

      </div>
    </div>
  );
};

export default AiAstrologers;

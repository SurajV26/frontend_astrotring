import { useNavigate } from "react-router-dom"
import Slider from "../Slider";
import ComponentHead from "@/components/ComponentHead";


const DUMMY_ASTROLOGERS = [
  { id: 1, name: "Acharya Rajesh", price: 10, image: "/AiAstro.jpg" },
  { id: 2, name: "Pandit Suresh", price: 15, image: "/AiAstro.jpg" },
  { id: 3, name: "Dr. Meera Sharma", price: 10, image: "/AiAstro.jpg" },
  { id: 4, name: "Guru Vijay", price: 12, image: "/AiAstro.jpg" },
  { id: 5, name: "Swami Anand", price: 20, image: "/AiAstro.jpg" },
  { id: 6, name: "Priya Devi", price: 18, image: "/AiAstro.jpg" },
  { id: 7, name: "Ravi Kumar", price: 25, image: "/AiAstro.jpg" },
  { id: 8, name: "Sunita Joshi", price: 22, image: "/AiAstro.jpg" },
  { id: 9, name: "Mahesh Bhai", price: 16, image: "/AiAstro.jpg" },
  { id: 10, name: "Kavita Singh", price: 28, image: "/AiAstro.jpg" },
  { id: 11, name: "Amit Verma", price: 32, image: "/AiAstro.jpg" },
  { id: 12, name: "Neeta Gupta", price: 35, image: "/AiAstro.jpg" },
  { id: 13, name: "Sanjay Mishra", price: 40, image: "/AiAstro.jpg" },
  { id: 14, name: "Rekha Devi", price: 24, image: "/AiAstro.jpg" },
  { id: 15, name: "Deepak Sharma", price: 38, image: "/AiAstro.jpg" },
];

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

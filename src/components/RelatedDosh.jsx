import { Link, useParams } from "react-router-dom";
import { servicesData } from "@/data/services/servicesData";

const RelatedDosh = () => {
  const { slug } = useParams();

  const filtered = servicesData.filter((item) => item.slug !== slug);
  console.log("filtered",filtered)
  

  return (
    <div
      className="lg:col-span-1 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 order-1 lg:order-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <h3 className="text-xl font-semibold mb-6">Related Dosh</h3>

      <div className="space-y-4">
        {filtered.map((item, index) => (
          <Link
            key={index}
            to={`/services/${item.slug}`}
            className="flex items-center gap-4 p-3 border rounded-2xl hover:bg-yellow-50 hover:border-yellow-400 transition-all"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-12 h-12 object-contain"
            />
            <span className="text-sm font-medium text-gray-800">
              {item.title}
            </span>
          </Link>
        ))}
      </div>

      <div className="bg-yellow-100 mt-6 p-6 rounded-2xl shadow">
        <h4 className="font-semibold mb-2">Need Personal Kundli Analysis?</h4>
        <p className="text-sm mb-3">
          Get detailed horoscope consultation from expert astrologers.
        </p>
        <Link
          to={"/talk-to-astrologer"}
          className="inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition"
        >
          BOOK Consultation
        </Link>
      </div>
    </div>
  );
};

export default RelatedDosh;

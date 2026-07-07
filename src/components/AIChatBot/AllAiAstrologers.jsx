import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAiAstrologers } from "@/redux/slice/aiChatSlice";
import { AiAstrologerCard } from "../Home/aiAstrologers/AiAstrologerCard";
import ComponentHead from "../ComponentHead";

const AllAiAstrologers = () => {
  const dispatch = useDispatch();
  const { allAiAstrologers, isFetchingAllAiAstrologers } = useSelector(
    (state) => state.aiChat,
  );

  useEffect(() => {
    dispatch(fetchAllAiAstrologers());
  }, [dispatch]);

  if (isFetchingAllAiAstrologers || !allAiAstrologers) {
    return (
      <div className="w-full bg-gradient-to-b from-amber-50 to-white py-6 flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">Loading astrologers...</p>
      </div>
    );
  }

  const data = Array.isArray(allAiAstrologers) ? allAiAstrologers : [];
  if (data.length === 0) {
    return (
      <div className="w-full bg-gradient-to-b from-amber-50 to-white py-6 flex justify-center items-center min-h-[300px]">
        <p className="text-gray-500">No astrologers found.</p>
      </div>
    );
  }

  return (
    <section className="mx-4 sm:mx-10  py-6">
      <div className="mx-auto px-4 mb-6">
        <ComponentHead
          heading="AI Astrologers"
          title="Connect with our expert AI astrologers for guidance"
        />
      </div>

      {/* Responsive grid – each card gets equal width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((astro, idx) => (
          <AiAstrologerCard key={idx} astro={astro} className="w-full" />
        ))}
      </div>
    </section>
  );
};

export default AllAiAstrologers;
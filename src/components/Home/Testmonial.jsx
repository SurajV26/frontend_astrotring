import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponentHead from "../ComponentHead";
import TestmonialCard from "../TestmonialCard";
import Slider from "./Slider";
import { fetchAllAiAstrologerReviews } from "@/redux/slice/aiAstrologerReviewSlice";

const Testmonial = () => {
  const dispatch = useDispatch();
  const { allReviews, allReviewsLoading, allReviewsError } = useSelector(
    (state) => state.aiAstrologerReview,
  );

  useEffect(() => {
    dispatch(fetchAllAiAstrologerReviews());
  }, [dispatch]);

  const reviews = allReviews ?? [];

  return (
    <section className="py-10">
      <div className="container">
        <ComponentHead
          className="text-start"
          heading="Testimonials"
          title="Hear from our satisfied clients about their experiences with our expert astrologers and the positive impact on their lives."
        />
        <div className="relative pt-10">
          {allReviewsLoading || (allReviews === null && !allReviewsError) ? (
            <p role="status" className="py-6 text-center text-gray-500">Loading reviews...</p>
          ) : allReviewsError ? (
            <div className="py-6 text-center">
              <p role="alert" className="text-gray-600">Unable to load reviews. Please try again.</p>
              <button type="button" onClick={() => dispatch(fetchAllAiAstrologerReviews())} className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium">
                Try again
              </button>
            </div>
          ) : reviews.length === 0 ? (
            <p className="py-6 text-center text-gray-500">No reviews yet.</p>
          ) : (
            <Slider slideCount={2}>
              {reviews.map((review) => (
                <TestmonialCard
                  key={review.id}
                  name={review.user?.name || "Anonymous"}
                  avatar={review.user?.profile_image}
                  rating={review.rating}
                  service={review.astrologer?.name}
                  expertise={review.astrologer?.expertises?.[0]?.name}
                  message={review.review || "No written review provided."}
                />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testmonial;

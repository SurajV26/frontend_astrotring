import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star, Sparkles, MessageSquare } from "lucide-react";
import { fetchAiAstrologerReviewsById } from "@/redux/slice/aiAstrologerReviewSlice";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const formatDate = (isoString) => {
  if (!isoString) return "";
  try {
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
};

const ReviewText = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return (
      <p className="text-muted-foreground text-xs sm:text-[13px] italic">
        No written review provided.
      </p>
    );
  }

  const isLong = text.length > 80;

  return (
    <div>
      <p
        className={`text-gray-700 text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
          !isExpanded ? "line-clamp-2" : ""
        }`}
      >
        {text}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-1 text-[11px] font-semibold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer transition-colors"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const userName =
    review.user?.name || review.user_name || review.name || "User";
  const userAvatar = review.user?.profile_image;
  const numericRating = Number(review.rating);
  const starCount = Number.isFinite(numericRating)
    ? Math.max(0, Math.min(5, Math.round(numericRating)))
    : 0;

  const reviewDate = formatDate(review.created_at);
  const userInitial = (userName?.trim()?.charAt(0) || "U").toUpperCase();

  return (
    <Card className="border border-amber-200/80 bg-white rounded-xl shadow-xs hover:shadow-md transition-shadow gap-0 p-5">
      <CardContent className="p-0 space-y-3">
        {/* User header with profile image and stars */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="size-10 ring-2 ring-amber-200 shrink-0">
              <AvatarImage
                src={userAvatar}
                alt={userName}
                className="object-cover"
              />
              <AvatarFallback className="bg-amber-500 text-white font-bold text-xs">
                {userInitial}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm truncate">
                {userName}
              </h4>
              {reviewDate && (
                <p className="text-[11px] text-muted-foreground">
                  {reviewDate}
                </p>
              )}
            </div>
          </div>

          {/* Stars for this review */}
          <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={13}
                className={
                  i < starCount
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>
        </div>

        {/* Review text with Read More */}
        <ReviewText text={review.review} />
      </CardContent>
    </Card>
  );
};

const AiAstrologerReviews = ({ astrologerId }) => {
  const dispatch = useDispatch();
  const {
    astrologerReviews,
    astrologerRating,
    astrologerReviewsId,
    astrologerReviewsLoading,
    astrologerReviewsError,
  } = useSelector((state) => state.aiAstrologerReview);

  useEffect(() => {
    if (astrologerId) {
      dispatch(fetchAiAstrologerReviewsById(astrologerId));
    }
  }, [dispatch, astrologerId]);

  const reviews = useMemo(() => astrologerReviews ?? [], [astrologerReviews]);
  const isLoading = astrologerReviewsLoading || astrologerReviewsId !== astrologerId;

  // Rating stats
  const totalReviews = astrologerRating?.total_reviews ?? reviews.length;
  const avgRating =
    astrologerRating?.average !== undefined && astrologerRating?.average !== null
      ? Number(astrologerRating.average)
      : reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length
      : 0;

  const roundedAvg = Math.round(avgRating);

  // Ratings breakdown from 5 stars to 1 star
  const ratingsBreakdown = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => {
      const count = reviews.filter((r) => Math.round(Number(r.rating)) === star).length;
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return { star, count, percentage };
    });
  }, [reviews, totalReviews]);

  return (
    <section className="mb-12" aria-labelledby="astrologer-reviews-heading">
      {/* SECTION TITLE */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2
            id="astrologer-reviews-heading"
            className="text-xl md:text-2xl font-bold text-gray-800"
          >
            Ratings & Reviews
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            Client feedback and ratings
          </p>
        </div>
      </div>

      {isLoading ? (
        /* SKELETON LOADING STATE */
        <div className="space-y-6">
          <Card className="border border-amber-200/70 bg-white rounded-2xl p-6">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex flex-col items-center gap-2">
                  <Skeleton className="h-10 w-20 bg-amber-100" />
                  <Skeleton className="h-4 w-28 bg-amber-50" />
                </div>
                <div className="md:col-span-8 space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-3 w-full bg-amber-50" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="border border-amber-200/70 bg-white rounded-xl p-5"
              >
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-full bg-amber-100" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-3.5 w-24 bg-amber-100" />
                      <Skeleton className="h-2.5 w-16 bg-amber-50" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-28 bg-amber-50" />
                  <Skeleton className="h-10 w-full bg-amber-50" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : astrologerReviewsError ? (
        <Card className="border border-amber-200 bg-white rounded-xl p-6 text-center">
          <CardContent className="p-0">
            <p role="alert" className="text-gray-600 text-sm">
              Unable to load reviews at this time.
            </p>
            <button
              type="button"
              onClick={() => dispatch(fetchAiAstrologerReviewsById(astrologerId))}
              className="mt-3 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
            >
              Try again
            </button>
          </CardContent>
        </Card>
      ) : reviews.length === 0 ? (
        <Card className="border border-amber-200 bg-white rounded-xl p-8 text-center">
          <CardContent className="p-0">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-800">No reviews yet</h3>
            <p className="text-muted-foreground text-xs mt-1">
              Be the first to consult and share your experience with this astrologer.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* RADIX CARD: RATING OVERVIEW WITH PROGRESS BARS */}
          <Card className="border border-amber-200/80 bg-white rounded-2xl p-5 md:p-6 shadow-xs gap-0">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Average score column */}
                <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-none">
                    {avgRating > 0 ? avgRating.toFixed(1) : "0.0"}
                  </span>
                  <div className="flex items-center gap-1 my-2 text-amber-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < roundedAvg
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <Badge variant="outline" className="text-xs text-muted-foreground border-amber-200 bg-amber-50/50">
                    {totalReviews} {totalReviews === 1 ? "review" : "reviews"} in total
                  </Badge>
                </div>

                {/* Vertical Separator for desktop */}
                <div className="hidden md:flex justify-center h-28">
                  <Separator orientation="vertical" className="bg-amber-100" />
                </div>

                {/* Progress bars of all ratings */}
                <div className="md:col-span-7 space-y-2">
                  {ratingsBreakdown.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center gap-3 text-xs">
                      <span className="w-12 font-medium text-gray-700 flex items-center gap-1 justify-end">
                        {star} <Star size={12} className="fill-amber-400 text-amber-400" />
                      </span>
                      <div className="flex-1">
                        <Progress
                          value={percentage}
                          className="h-2 bg-amber-50 [&>[data-slot=progress-indicator]]:bg-gradient-to-r [&>[data-slot=progress-indicator]]:from-amber-400 [&>[data-slot=progress-indicator]]:to-orange-500"
                        />
                      </div>
                      <span className="w-8 text-right font-medium text-muted-foreground">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* REVIEWS LIST */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id ?? index} review={review} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default AiAstrologerReviews;

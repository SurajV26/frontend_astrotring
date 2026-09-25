import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { clearReviewError, submitAiAstrologerReview } from "@/redux/slice/aiAstrologerReviewSlice";

export default function AstrologerReviewDialog({ target, onClose, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const { loading: pending, error } = useSelector((state) => state.aiAstrologerReview);
  const submitting = useRef(false);

  useEffect(() => { dispatch(clearReviewError()); }, [dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current || pending) return;
    if (!target.astrologerId || !target.astrologerSlug || !rating || !review.trim() || review.length > 1000) return;
    submitting.current = true;
    try {
      await dispatch(submitAiAstrologerReview({
        astrologer_id: target.astrologerId,
        rating,
        review: review.trim(),
      })).unwrap();
      onSubmitted(target);
    } catch {
      // The slice exposes the API error; preserve the form for retry.
    } finally {
      submitting.current = false;
    }
  };

  return (
    <Dialog open onOpenChange={(open) => { if (!open && !submitting.current) onClose(); }}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto bg-white" showCloseButton={!pending}>
        <DialogTitle className="pr-8">Rate {target.name}</DialogTitle>
        <DialogDescription>How was your consultation? Share your rating and review.</DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4" aria-busy={pending}>
          <fieldset disabled={pending}>
            <legend className="mb-2 text-sm font-medium">Your rating (required)</legend>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="cursor-pointer rounded p-1 has-focus-visible:ring-2 has-focus-visible:ring-amber-500">
                  <input className="sr-only" type="radio" name="rating" value={value} required checked={rating === value} onChange={() => setRating(value)} aria-label={`${value} ${value === 1 ? "star" : "stars"}`} />
                  <Star aria-hidden="true" className={`h-8 w-8 ${value <= rating ? "fill-amber-400 text-amber-500" : "text-gray-300"}`} />
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="astrologer-review" className="text-sm font-medium">Your review (required)</label>
            <textarea id="astrologer-review" required maxLength={1000} rows={4} value={review} disabled={pending} onChange={(event) => setReview(event.target.value)} placeholder="Tell us about your experience..." className="mt-2 w-full resize-y rounded-xl border border-amber-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" aria-describedby="review-count" />
            <p id="review-count" className="text-right text-xs text-gray-500">{review.length}/1,000</p>
          </div>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <div className="flex justify-end gap-3">
            <button type="button" disabled={pending} onClick={onClose} className="rounded-lg px-4 py-2 text-sm disabled:opacity-50">Skip</button>
            <button type="submit" disabled={pending || !rating || !review.trim()} className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold hover:bg-amber-500 disabled:opacity-50">{pending ? "Submitting..." : "Submit review"}</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

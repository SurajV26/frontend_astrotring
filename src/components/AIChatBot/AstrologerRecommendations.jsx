import { useState } from "react";
import { ArrowRight, CircleAlert, LoaderCircle, MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function AstrologerRecommendations({ message, currentSlug, disabled, onSwitch }) {
  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const alternatives = (message.alternative_astrologers || []).filter(
    (astro) => astro?.name && astro?.slug && astro?.expertise?.slug && astro.slug !== currentSlug,
  );
  const hasPrice = (price) => price != null && String(price).trim() !== "" &&
    Number.isFinite(Number(price)) && Number(price) >= 0;

  if (!message.scope_limited || !alternatives.length) return null;

  const confirm = async () => {
    if (busy || disabled || !selected || !hasPrice(selected.chat_price)) return;
    setBusy(true);
    setError("");
    try {
      await onSwitch(selected);
      setSelected(null);
    } catch (err) {
      setError(typeof err === "string" ? err : err?.message || "Unable to switch astrologer. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3 space-y-2 border-t border-amber-100 pt-3">
      {alternatives.map((astro) => (
        <div key={`${astro.slug}/${astro.expertise.slug}`} className="rounded-lg bg-amber-50 p-3">
          <button
            type="button"
            disabled={disabled || busy || !hasPrice(astro.chat_price)}
            onClick={() => { setSelected(astro); setError(""); }}
            className="cursor-pointer text-left text-sm font-semibold text-blue-700 underline underline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Chat with {astro.name}{hasPrice(astro.chat_price) && ` — ₹${astro.chat_price}/min`}
          </button>
          <p className="mt-1 text-xs text-gray-600">{astro.expertise.name}</p>
          {!hasPrice(astro.chat_price) && <p className="mt-1 text-xs text-gray-500">Chat rate unavailable.</p>}
        </div>
      ))}
      <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open && !busy) setSelected(null); }}>
        <DialogContent className="max-h-[90dvh] gap-0 overflow-y-auto rounded-3xl border-amber-100 bg-white p-0 shadow-2xl sm:max-w-md" showCloseButton={false}>
          <div className="relative rounded-t-3xl bg-gradient-to-br from-amber-50 via-amber-100/70 to-orange-50 px-6 pb-6 pt-7 sm:px-8">
            <button
              type="button"
              aria-label="Close switch dialog"
              disabled={busy}
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-amber-900/60 transition hover:bg-white/80 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-white text-amber-600 shadow-sm">
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
            </div>
            <DialogTitle className="text-xl font-semibold leading-snug text-gray-900">Continue with {selected?.name}</DialogTitle>
            <DialogDescription className="mt-2 leading-relaxed text-gray-600">Continue your question in a new chat.</DialogDescription>
          </div>

          <div className="space-y-5 px-6 py-6 sm:px-8">
            {error && (
              <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}
            <div className="flex flex-col-reverse gap-2.5 sm:flex-row">
              <button type="button" disabled={busy} onClick={() => setSelected(null)} className="flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50">Stay here</button>
              <button type="button" disabled={busy || disabled} onClick={confirm} className="flex flex-[1.5] cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-gray-950 shadow-sm transition hover:bg-amber-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {busy ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <MessageCircle className="h-4 w-4" aria-hidden="true" />}
                {busy ? "Switching…" : "Switch astrologer"}
                {!busy && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

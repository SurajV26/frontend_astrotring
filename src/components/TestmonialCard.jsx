import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, User } from "lucide-react"

const TestmonialCard = ({ id, name, avatar, rating, service, expertise, message }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const numericRating = Number(rating);
    const starCount = Number.isFinite(numericRating)
        ? Math.max(0, Math.min(5, Math.round(numericRating)))
        : 0;

    const maxLength = 90;
    const text = message || "No written review provided.";
    const isLong = text.length > maxLength;

    return (
        <Card key={id} className="w-full rounded-tl-4xl rounded-br-4xl rounded-bl-none rounded-tr-none border shadow-sm">
            <CardContent className="p-5 space-y-4">

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500">
                    {Array.from({ length: starCount }, (_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>

                {/* Testimonial Text with inline ... Read more on second line */}
                <div>
                    <p className="text-sm text-gray-900 leading-relaxed">
                        {isExpanded || !isLong ? (
                            <>
                                {text}
                                {isLong && (
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(false)}
                                        className="ml-1 text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer inline transition-colors"
                                    >
                                        Read less
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <span>{text.slice(0, maxLength).trim()}...</span>
                                <button
                                    type="button"
                                    onClick={() => setIsExpanded(true)}
                                    className="ml-1 text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline cursor-pointer inline transition-colors"
                                >
                                    Read more
                                </button>
                            </>
                        )}
                    </p>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-2 min-w-0">
                    {
                        avatar ?
                            <img
                                src={avatar}
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover shrink-0"
                            />
                            :
                            <User className="w-12 h-12 rounded-full object-cover bg-muted p-2 shrink-0" />
                    }
                    <div className="min-w-0 flex-1">
                        <h4 className="text-md font-semibold truncate">{name}</h4>
                        <p
                            className="text-sm text-muted-foreground truncate"
                            title={`${service || ""}${expertise ? ` - ${expertise}` : ""}`}
                        >
                            {service}{expertise ? ` - ${expertise}` : ""}
                        </p>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default TestmonialCard

import { Card, CardContent } from "@/components/ui/card"
import { Star, User } from "lucide-react"

const TestmonialCard = ({ id, name, avatar, rating, service, message }) => {
    return (
        <Card key={id} className="w-full rounded-tl-4xl rounded-br-4xl rounded-bl-none rounded-tr-none border shadow-sm">
            <CardContent className="p-5 space-y-4">

                {/* Rating */}
                <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                    ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-gray-900 leading-relaxed">
                    "{message}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-2">
                    {
                        avatar ?
                            <img
                                src={avatar}
                                alt="User"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            :
                            <User className="w-12 h-12 rounded-full object-cover bg-muted p-2" />

                    }
                    <div>
                        <h4 className="text-md! font-semibold">{name}</h4>
                        <span className="text-sm text-muted-foreground">
                            {service}
                        </span>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default TestmonialCard
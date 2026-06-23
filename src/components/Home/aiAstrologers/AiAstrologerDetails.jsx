import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Star, MessageCircle, X, Sparkles, Languages, Clock } from "lucide-react"
import { useState } from "react"

const AiAstrologerDetails = ({ astro, open, onClose }) => {
  const dummyDetails = {
    description: `${astro.name} is an experienced AI astrologer specializing in Vedic astrology, numerology, and tarot readings. With advanced AI algorithms, ${astro.name} provides accurate predictions and personalized guidance for various life aspects including career, relationships, health, and spiritual growth.`,
    expertise: ["Vedic Astrology", "Numerology", "Tarot Reading", "Palmistry", "Vastu Shastra", "Gemstone Recommendation"],
    languages: ["Hindi", "English", "Marathi", "Gujarati"],
    avgResponseTime: "2-3 minutes",
    totalConsultations: Math.floor(Math.random() * 5000) + 1000,
    satisfactionRate: "95%",
    sampleQuestions: [
      "When will I get married?",
      "What is my career growth?",
      "Will I get a promotion this year?",
      "What are my lucky numbers?",
      "Which gemstone should I wear?"
    ]
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold text-amber-900">AI Astrologer Details</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={astro.image}
                alt={astro.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-amber-200"
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-2">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800">{astro.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">({dummyDetails.totalConsultations} consultations)</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{dummyDetails.avgResponseTime} response</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span>{dummyDetails.satisfactionRate} satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">Consultation Price</span>
              <span className="text-2xl font-bold text-amber-600">₹{astro.price}/msg</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">About</h4>
            <p className="text-gray-600 leading-relaxed">{dummyDetails.description}</p>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Expertise Areas</h4>
            <div className="flex flex-wrap gap-2">
              {dummyDetails.expertise.map((exp, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Languages
            </h4>
            <div className="flex flex-wrap gap-2">
              {dummyDetails.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Questions */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Sample Questions You Can Ask</h4>
            <div className="space-y-2">
              {dummyDetails.sampleQuestions.map((question, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 border border-gray-200"
                >
                  "{question}"
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-6 text-lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Chat with {astro.name}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AiAstrologerDetails

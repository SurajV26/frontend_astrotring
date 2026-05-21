import React from 'react'
import ComponentHead from '../ComponentHead'
import TestmonialCard from '../TestmonialCard'
import Slider from './Slider'

export const testimonials = [
    {
        id: 1,
        name: "Rohit Sharma",
        avatar: "https://github.com/maxleiter.png",
        rating: 5,
        service: "Tarot Consultation",
        message: "The astrologer was very accurate and gave me great guidance. I felt positive and confident after the session.",
    },
    {
        id: 2,
        name: "Anjali Verma",
        avatar: "https://github.com/evilrabbit.png",
        rating: 4,
        service: "Vedic Astrology",
        message: "Very detailed and helpful session. The predictions were clear and easy to understand.",
    },
    {
        id: 3,
        name: "Amit Singh",
        avatar: "https://github.com/shadcn.png",
        rating: 5,
        service: "Numerology Reading",
        message: "Excellent experience! I got clarity about my career and personal life.",
    },
    {
        id: 4,
        name: "Priya Mehta",
        avatar: "https://github.com/maxleiter.png",
        rating: 4,
        service: "Palm Reading",
        message: "The guidance was honest and practical. Would definitely recommend to others.",
    },
]

const Testmonial = () => {
    return (
      <section className="py-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
            <div className="container">
                <ComponentHead
                  className="text-start mb-5"
                  heading="Testimonials"
                  title="Hear from our satisfied clients about their experiences with our expert astrologers and the positive impact on their lives."
                />
                <div className="relative pt-10">
                    <Slider slideCount={2}>
                        {
                            testimonials.map(testimonials => <TestmonialCard key={testimonials.id} {...testimonials} />)
                        }
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Testmonial
import { Link } from "react-router-dom";
import React from "react";
import ComponentHead from "@/components/ComponentHead";
import { servicesData } from "@/data/services/servicesData";

const Services = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <ComponentHead
            heading="Complimentary Astrology Services"
            title="We offer free consultations to help you understand your birth chart and its implications."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map((item, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${item.bg} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden min-h-[280px] flex flex-col justify-between`}
            >
              <div className="z-10">
                <h4 className="text-xl font-semibold mb-3">
                  {item.title}
                </h4>

                <p className="text-gray-700 text-sm mb-6">
                  {item.desc}
                </p>
              </div>

              <Link
                to={`/services/${item.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-white px-5 py-2 rounded-xl text-sm font-medium shadow-md w-fit"
              >
                View More
              </Link>
              <img
                src={item.img}
                alt={item.title}
                className="absolute bottom-4 right-4 w-32 h-32 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

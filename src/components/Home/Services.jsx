// import { Link } from "react-router-dom";
// import React from "react";
// import ComponentHead from "@/components/ComponentHead";
// import { servicesData } from "@/data/servicesData";
// import { useTranslation } from "react-i18next";

// const Services = () => {
// const {t} =useTranslation();
//   return (
//     <section className="py-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
//       <div className="container mx-auto px-6">
//         {/* 👇 Heading Center */}
//         <div className="text-center mb-14">
//           <ComponentHead
//             heading="Complimentary Astrology Services"
//             title="We offer free consultations to help you understand your birth chart and its implications."
//           />
//         </div>

//         {/* 👇 Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//           {servicesData.map((item, index) => (
//             <div
//               key={index}
//               className={`relative bg-gradient-to-br ${item.bg} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden min-h-[280px] flex flex-col justify-between`}
//             >
//               <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white transition duration-500"></div>

//               <div className="z-10 relative overflow-hidden transition-all duration-500 hover:scale-105">
//                 <h4 className="text-xl font-semibold mb-3 leading-snug">
//                   {item.title}
//                 </h4>
//                 <p className="text-gray-700 text-sm mb-6 leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>

//               <Link
//                 to={`/services/${item.slug}`}
//                 className="z-10 relative bg-white/90 backdrop-blur px-5 py-2 rounded-xl text-sm font-medium hover:bg-white transition w-fit shadow-md inline-block"
//               >
//                 {item.btn}
//               </Link>

//               <img
//                 src={item.img}
//                 alt={item.title}
//                 className="absolute bottom-4 right-4 w-32 h-32 object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;

import { Link } from "react-router-dom";
import React from "react";
import ComponentHead from "@/components/ComponentHead";
import { servicesData } from "@/data/servicesData";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  return (
    <section className="py-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <ComponentHead
            heading={t("services.heading")}
            title={t("services.subtitle")}
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
                  {t(`services.${item.slug}.title`)}
                </h4>

                <p className="text-gray-700 text-sm mb-6">
                  {t(`services.${item.slug}.desc`)}
                </p>
              </div>

              {/* <Link
                to={`/services/${item.slug}`}
                className="bg-white px-5 py-2 rounded-xl text-sm font-medium shadow-md w-fit"
              >
                {t("services.viewMore")}
              </Link> */}
              <Link
                to={`/services/${item.slug}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-white px-5 py-2 rounded-xl text-sm font-medium shadow-md w-fit"
              >
            {t("services.viewMore")}
              </Link>
              <img
                src={item.img}
                alt={t(`services.${item.slug}.title`)}
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

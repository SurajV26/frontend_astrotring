import React from "react";
import { Link } from "react-router-dom";

export const allMahuratData = [
  { name: "Annaprashan Muhurat", link: "/annaprashan-muhurat" },
  { name: "Namkaran Muhurat", link: "/namkaran-muhurat" },
  { name: "Car / Bike Muhurat", link: "/car-bike-muhurat" },
  { name: "Marriage Muhurat", link: "/marriage-muhurat" },
  { name: "Bhoomi Pujan Muhurat", link: "/bhoomi-pujan-muhurat" },
  { name: "Griha Pravesh Muhurat", link: "/griha-pravesh-muhurat" },
  { name: "Mundan Muhurat", link: "/mundan-muhurat" },
];

const MuhuratCard = ({ children }) => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT MAIN CONTENT */}
          <div className="lg:col-span-2">{children}</div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-24 h-fit bg-white border rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-4">Related Muhurat</h3>

            <div className="space-y-2">
              {allMahuratData.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="block border rounded-lg p-3 hover:bg-orange-50 transition"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default MuhuratCard;

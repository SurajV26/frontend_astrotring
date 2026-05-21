import HeadWithLogo from "@/components/HeadWithLogo";
import MuhuratCard from "@/components/common/MuhuratCard";
import React from "react";

const CarBike = () => {
  const year = new Date().getFullYear();

  return (
    <MuhuratCard className="py-10">
      <div className="container mx-auto max-w-4xl space-y-8">
        <HeadWithLogo title={`Car / Bike Muhurat ${year}`} />

        <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Vehicle Purchase · Auspicious Timing · Jyotish
        </p>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Car & Bike Muhurat {year}: The Best Auspicious Times to Buy Your New
          Vehicle
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          A clear, honest guide to why muhurat matters for vehicle purchases —
          and how to find the right time in {year} for your new car or bike.
        </p>

        {/* QUICK ANSWER */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg">⚡ QUICK ANSWER</h2>

          <p>
            Car and Bike Muhurat refers to the auspicious dates and times
            selected through Vedic astrology (Jyotish Shastra) for purchasing a
            new vehicle.
          </p>

          <p>
            In {year}, the ideal muhurat is calculated using Panchang elements —
            Tithi, Nakshatra, Vara, Yoga, and Karana — along with the buyer's
            birth chart. The goal is to begin the vehicle's journey on a
            positive cosmic note, supporting safety, longevity, and prosperity.
          </p>
        </div>

        {/* WHY MUHURAT */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Why Do Indians Choose a Muhurat to Buy a Car or Bike?
          </h2>

          <p>
            In a country where vehicles carry people to weddings, pilgrimages,
            hospital deliveries, and first days of school — a car or bike is not
            just a machine. It is a witness to life.
          </p>

          <p>
            The tradition of choosing an auspicious muhurat for a vehicle
            purchase is rooted in a simple but powerful idea: beginnings matter.
            When you start something significant at the right moment, you align
            that beginning with supportive energy — reducing friction, inviting
            protection, and starting the journey well.
          </p>

          <p>
            This is not about superstition. It is about intention. Choosing a
            muhurat forces you to pause, consult, reflect, and make the purchase
            mindfully — rather than impulsively.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            "A vehicle bought on an auspicious muhurat is believed to travel
            more safely, require fewer repairs, and bring genuine prosperity to
            its owner. The timing is a form of care — for yourself, your family,
            and every journey ahead."
          </blockquote>
        </div>

        {/* PANCHANG TABLE */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            What Makes a Good Vehicle Purchase Muhurat in {year}?
          </h2>

          <p>
            Vedic astrologers evaluate the Panchang — the five-limbed almanac —
            to identify windows when planetary energies support new ventures.
            For vehicle purchases specifically:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Factor</th>
                  <th className="border p-3">Favourable Conditions</th>
                  <th className="border p-3">What to Avoid</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Tithi (Lunar Day)</td>
                  <td className="border p-3">
                    Dwitiya, Tritiya, Panchami, Saptami, Dasami, Ekadashi,
                    Trayodashi
                  </td>
                  <td className="border p-3">
                    Amavasya (new moon), Chaturdashi, Ashtami
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Nakshatra</td>
                  <td className="border p-3">
                    Pushya, Rohini, Hasta, Ashwini, Revati, Anuradha
                  </td>
                  <td className="border p-3">
                    Ardra, Jyeshtha, Bharani, Krittika
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Vara (Day)</td>
                  <td className="border p-3">Wednesday, Thursday, Friday</td>
                  <td className="border p-3">Saturday for new purchases</td>
                </tr>

                <tr>
                  <td className="border p-3">Rahu / Ketu</td>
                  <td className="border p-3">
                    Avoid Rahu Kalam and Ketu Kalam entirely
                  </td>
                  <td className="border p-3">Varies daily</td>
                </tr>

                <tr>
                  <td className="border p-3">Lagna</td>
                  <td className="border p-3">
                    Strong, unafflicted ascendant in buyer's chart
                  </td>
                  <td className="border p-3">
                    Afflicted 8th house (accidents, losses)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Additionally, the planet Venus (Shukra) — which governs vehicles,
            luxury, and comfort — should ideally be in a strong, unafflicted
            position.
          </p>
        </div>

        {/* BEST MONTHS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            The Best Months to Buy a Vehicle in {year}
          </h2>

          <p>
            While every buyer needs a personalised muhurat, certain periods in
            {year} are generally considered favourable for new purchases —
            particularly when Jupiter is well-placed in the zodiac and Venus is
            not in combustion (too close to the Sun).
          </p>

          <p>Broadly favourable windows in {year} include:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Post-Makar Sankranti (mid-January onwards) — the Sun entering
              Capricorn opens an auspicious season
            </li>
            <li>
              Akshaya Tritiya (April/May {year}) — one of the most auspicious
              days of the year
            </li>
            <li>
              After Shraddha Paksha ends (October {year}) — Navratri and festive
              season bring highly auspicious energies
            </li>
          </ul>

          <p>
            That said: do not rely on general windows alone. A personalised
            calculation based on your birth chart ensures the muhurat works
            specifically for you.
          </p>
        </div>

        {/* PRACTICAL TIPS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Practical Tips: Making the Most of Your Vehicle Muhurat
          </h2>

          <h3 className="font-semibold">Before You Buy</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Confirm the muhurat with your astrologer at least 2–3 weeks in
              advance — good dates can get busy at dealerships
            </li>
            <li>
              Have the paperwork and payment ready so you can complete the
              purchase precisely within the auspicious window
            </li>
            <li>
              Inform the dealership of your preferred timing — most are
              accustomed to this request in India
            </li>
          </ul>

          <h3 className="font-semibold mt-4">On the Day</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>Perform a small Ganesh Puja before taking delivery.</li>
            <li>
              Many families apply a tilak to the vehicle and garland it with
              marigolds — a beautiful tradition of welcome
            </li>
            <li>
              The first drive is often to a temple, symbolically beginning the
              vehicle's journey with a blessing
            </li>
            <li>
              Sweets are distributed to family, friends, and sometimes
              dealership staff
            </li>
          </ul>

          <h5 className="font-bold mt-4">A Note for Diaspora Families</h5>
          <p>
            For Indians living abroad, the muhurat can still be observed
            meaningfully — even if purchasing from a foreign dealership. The key
            is the delivery moment: receive the keys during the auspicious
            window. Time zones can be factored in when consulting your
            astrologer.
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

          <p>
            <strong>
              Does muhurat guarantee the vehicle won't have problems?
            </strong>
            <br />
            No — and any astrologer worth consulting will tell you the same.
            Muhurat is about intention and alignment, not mechanical guarantees.
            Good maintenance, safe driving, and regular servicing remain
            essential. Think of muhurat as one layer of care among many.
          </p>

          <p>
            <strong>
              What if the muhurat falls on a weekday when I have work?
            </strong>
            <br />
            Speak with your astrologer. They will usually identify 3–5 suitable
            dates within a window. The most auspicious day you can actually
            attend to fully is better than a theoretically perfect day spent
            distracted.
          </p>

          <p>
            <strong>Is there a specific muhurat for bikes vs cars?</strong>
            <br />
            The principles are the same. Some astrologers consider the vehicle
            type when evaluating specific planetary positions — for instance,
            Mars (energy, speed) is particularly relevant for motorcycles.
          </p>
        </div>

        {/* FINAL NOTE */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">A Final Note</h2>

          <p>
            Every journey begins somewhere. A muhurat is simply a way of asking:
            when is the best possible moment to begin this one?
          </p>

          <p>
            Whether you follow Vedic tradition deeply or hold it lightly — the
            act of pausing, consulting, and choosing mindfully before a major
            purchase is itself a kind of wisdom.
          </p>

          <p>May every road ahead be smooth. 🙏</p>
        </div>

        <p className="text-sm text-gray-600">
          Tags: Car Muhurat {year} | Bike Muhurat {year} | Vehicle Purchase
          Auspicious Time | Shubh Muhurat New Car | Jyotish Shastra | Panchang{" "}
          {year} | Akshaya Tritiya {year}
        </p>
      </div>
    </MuhuratCard>
  );
};

export default CarBike;

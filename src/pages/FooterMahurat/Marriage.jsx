import HeadWithLogo from "@/components/HeadWithLogo";
import MuhuratCard from "@/components/common/MuhuratCard";
import React from "react";

const Marriage = () => {
  const year = new Date().getFullYear();

  return (
    <MuhuratCard className="py-10">
      <div className="container mx-auto max-w-4xl space-y-8">
        <HeadWithLogo title={`Marriage Muhurat ${year}`} />

        {/* Kicker */}
        <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Vivah Muhurat · Wedding Astrology · Hindu Marriage
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Marriage Muhurat {year}: Auspicious Wedding Dates, Tithis & What They
          Mean
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg leading-relaxed">
          A grounded, complete guide for couples planning their wedding in{" "}
          {year} — covering why muhurat matters, which dates are considered
          auspicious, and how to find your personalised timing.
        </p>

        {/* QUICK ANSWER */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg">⚡ QUICK ANSWER</h2>

          <p>
            Marriage Muhurat refers to the auspicious date and time chosen
            through Vedic astrology for a wedding ceremony.
          </p>

          <p>
            In {year}, muhurat is calculated based on the Panchang, planetary
            positions (especially Jupiter and Venus), and the birth charts of
            both partners. Certain Tithis — like Tritiya, Saptami, and
            Trayodashi — are considered especially favourable. A personalised
            muhurat from a qualified Jyotishi is strongly recommended.
          </p>
        </div>

        {/* WHY TIMING MATTERS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Why Does the Timing of a Wedding Matter in Vedic Tradition?
          </h2>

          <p>
            Two people can fall in love on any day. But in Hindu tradition, the
            day they formally commit their lives to each other — the moment the
            sacred fire is lit, the vows spoken, the seven steps taken — that
            moment is treated as a beginning that carries its own energy.
          </p>

          <p>
            A marriage muhurat is not about finding a perfect, problem-free
            future. Life brings challenges regardless. It is about beginning a
            shared journey under conditions believed to support harmony,
            resilience, and mutual flourishing.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            "Marriage is the joining of two people, two families, two destinies.
            Choosing a muhurat is the community's way of saying: we want this
            beginning to be as strong, as protected, and as auspicious as it can
            be."
          </blockquote>

          <p>
            For many modern couples, the muhurat also serves a practical
            purpose: it creates a clear, structured decision around one of
            life's most loaded choices — the wedding date. Rather than endless
            negotiation, the astrologer's guidance gives everyone a framework.
          </p>
        </div>

        {/* PLANETARY CONDITIONS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            What Makes a Good Marriage Muhurat in {year}?
          </h2>

          <p>
            Vedic astrology considers multiple layers when evaluating a wedding
            date. The most significant factors involve planetary positions.
          </p>

          <h3 className="font-semibold">Planetary Positions</h3>

          <p>
            Jupiter (Guru) and Venus (Shukra) are the two most important planets
            for marriage. Jupiter represents wisdom, blessings, and expansion;
            Venus governs love, beauty, and partnership.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Jupiter should be strong, direct (not retrograde), and favourably
              placed.
            </li>
            <li>
              Venus should not be combust (too close to the Sun) or in an enemy
              sign.
            </li>
            <li>
              Mars should not afflict the 7th house (house of partnership) in
              the muhurat chart.
            </li>
          </ul>
        </div>

        {/* TITHI TABLE */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Favourable Tithis for Marriage in {year}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Tithi</th>
                  <th className="border p-3">Symbolism</th>
                  <th className="border p-3">Why It's Chosen for Weddings</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Dwitiya (2nd)</td>
                  <td className="border p-3">Wealth, stability</td>
                  <td className="border p-3">
                    Strong foundation for married life; material security
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Tritiya (3rd)</td>
                  <td className="border p-3">Growth, balance</td>
                  <td className="border p-3">
                    Harmony and mutual understanding; ideal for equals
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Panchami (5th)</td>
                  <td className="border p-3">Abundance, success</td>
                  <td className="border p-3">
                    Prosperity-oriented; good for couples with ambition
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Saptami (7th)</td>
                  <td className="border p-3">Happiness, bliss</td>
                  <td className="border p-3">
                    One of the most beloved wedding tithis; marital joy
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Dasami (10th)</td>
                  <td className="border p-3">Achievement</td>
                  <td className="border p-3">
                    Good for professionally accomplished couples
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Ekadashi (11th)</td>
                  <td className="border p-3">Spiritual harmony</td>
                  <td className="border p-3">
                    Preferred by spiritually inclined or devotional couples
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Trayodashi (13th)</td>
                  <td className="border p-3">Joy, longevity</td>
                  <td className="border p-3">
                    Highly auspicious; believed to bring lasting happiness
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* NAKSHATRAS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Auspicious Nakshatras for Marriage
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>Rohini — fertility and enduring partnership</li>
            <li>Mrigashira — romantic relationships</li>
            <li>Magha — strong family blessings</li>
            <li>
              Uttara Phalguni — one of the most traditional wedding Nakshatras;
              associated with Juno, goddess of marriage
            </li>
            <li>Hasta — skill, adaptability, and a harmonious domestic life</li>
            <li>
              Swati — independence within partnership; modern couples often
              favour this
            </li>
            <li>Anuradha — devotion and emotional bonds</li>
            <li>Uttara Ashadha — victory and success</li>
            <li>
              Uttara Bhadrapada — deep commitment and spiritual connection
            </li>
            <li>
              Revati — nurturing, gentle, and auspicious for new beginnings
            </li>
          </ul>
        </div>

        {/* WEDDING SEASONS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Key Auspicious Periods for Weddings in {year}
          </h2>

          <p>
            In the Hindu calendar, certain periods are considered 'Vivah
            Muhurat-free' — times when weddings are traditionally avoided. These
            include Adhik Maas (leap month, if applicable), Pitru Paksha
            (ancestral fortnight in September/October), and periods of
            significant planetary affliction.
          </p>

          <p>Broadly auspicious wedding seasons in {year} include:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              January–February {year} (post-Makar Sankranti, before Holi season)
            </li>
            <li>
              April–May {year} (Akshaya Tritiya in particular is universally
              auspicious)
            </li>
            <li>
              Late November–December {year} (post-festive season, heading into
              winter weddings)
            </li>
          </ul>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            Always verify specific dates with a qualified astrologer using both
            partners' birth charts.
          </blockquote>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

          <p>
            <strong>
              How far in advance should we consult an astrologer for a marriage
              muhurat?
            </strong>
            <br />
            Ideally 6–12 months before your preferred wedding season. Popular
            auspicious dates — especially around Akshaya Tritiya — get booked
            quickly by both astrologers and venues.
          </p>

          <p>
            <strong>
              Does both partners' Kundali (birth chart) need to match for
              marriage?
            </strong>
            <br />
            Kundali Milan (chart compatibility) is a separate but related
            consultation. The muhurat calculation focuses on timing; the Milan
            assesses compatibility. Many families request both. Neither is
            mandatory, but both can offer useful perspective.
          </p>

          <p>
            <strong>
              Can we have a court marriage outside the muhurat and a religious
              ceremony within it?
            </strong>
            <br />
            Yes, and many couples do exactly this — especially for practical or
            legal reasons. The religious ceremony (including fire rituals and
            vows) is what the muhurat traditionally governs.
          </p>

          <p>
            <strong>
              What is Chandra Bal and Tara Bal? Do we need to check them?
            </strong>
            <br />
            Chandra Bal (lunar strength) and Tara Bal (star strength) are
            additional checks some astrologers include when finalising a
            muhurat. They assess whether the moon's position on the chosen day
            is specifically supportive for each individual. A thorough
            astrologer will include these automatically.
          </p>
        </div>

        {/* Social Media Hooks — Ready to Share */}

        {/* FINAL NOTE */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">A Final Note</h2>

          <p>
            A marriage is one of the few things in life meant to last longer
            than any single season or challenge. The care that goes into
            choosing its beginning reflects how deeply that commitment is
            valued.
          </p>

          <p>
            Whatever day you choose, and however you choose it: may it be a
            beginning worthy of everything that follows. 🙏
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Tags: Marriage Muhurat {year} | Wedding Dates {year} India | Vivah
          Muhurat | Shubh Muhurat Shaadi | Auspicious Wedding Dates Hindu |
          Panchang {year} | Kundali Milan
        </p>
      </div>
    </MuhuratCard>
  );
};

export default Marriage;

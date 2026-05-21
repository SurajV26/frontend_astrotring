import HeadWithLogo from "@/components/HeadWithLogo";
import MuhuratCard from "@/components/common/MuhuratCard";
import React from "react";

const BhumiPuja = () => {
  const year = new Date().getFullYear();

  return (
    <MuhuratCard className="py-10">
      <div className="container mx-auto max-w-4xl space-y-8">
        <HeadWithLogo title={`Bhoomi Pujan Muhurat ${year}`} />

        {/* Kicker */}
        <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Foundation Ceremony · Construction Ritual · Vastu
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Bhoomi Pujan {year}: The Complete Guide to India's Sacred
          Ground-Breaking Ceremony
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg leading-relaxed">
          Everything you need to know before breaking ground — from the ritual's
          meaning and Vedic significance to step-by-step ceremony guide and how
          to find your auspicious muhurat in {year}.
        </p>

        {/* QUICK ANSWER */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg">⚡ QUICK ANSWER</h2>

          <p>
            Bhoomi Pujan is the Hindu ground-breaking ceremony performed before
            any new construction — a home, office, temple, or commercial
            building.
          </p>

          <p>
            It is an act of gratitude toward Mother Earth (Bhoomi Devi), seeking
            her permission and blessing before the land is disturbed. In {year},
            the auspicious muhurat for Bhoomi Pujan is calculated using the
            Panchang, the landowner's birth chart, and Vastu Shastra principles.
          </p>
        </div>

        {/* MEANING */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            What Is Bhoomi Pujan — And Why Does It Still Matter?
          </h2>

          <p>
            Before the first shovel breaks the ground. Before the concrete is
            poured. Before the walls rise — there is Bhoomi Pujan.
          </p>

          <p>
            Bhoomi means earth or land, and Pujan means worship or reverence.
            Together, Bhoomi Pujan is the ritual of asking permission from the
            earth before we build upon it — acknowledging that the land is not
            merely raw material but a living entity that sustains us.
          </p>

          <p>
            In a world that moves fast and builds even faster, Bhoomi Pujan is a
            deliberate act of mindfulness. It reminds us that construction is
            not just about structures but about relationships with the land that
            supports them.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            "We don't own the earth. We borrow it. Bhoomi Pujan is the moment we
            acknowledge that borrowing — and ask, with gratitude, to be good
            custodians of what we've been given."
          </blockquote>
        </div>

        {/* SIGNIFICANCE TABLE */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            The Spiritual and Vastu Significance of Bhoomi Pujan
          </h2>

          <p>
            Bhoomi Pujan sits at the intersection of three ancient Indian
            sciences: Jyotish Shastra, Vastu Shastra, and ritual worship.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Tradition</th>
                  <th className="border p-3">What It Contributes</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Jyotish Shastra</td>
                  <td className="border p-3">
                    Selects the auspicious muhurat aligned with planetary
                    positions.
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Vastu Shastra</td>
                  <td className="border p-3">
                    Guides orientation and energy flow of the building site.
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Puja Tradition</td>
                  <td className="border p-3">
                    Invokes blessings of Bhoomi Devi, Lord Ganesha and
                    Navagrahas.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ASTROLOGICAL FACTORS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Astrological Factors for Bhoomi Pujan Muhurat in {year}
          </h2>

          <p>
            A Bhoomi Pujan muhurat is calculated with particular attention to:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Tithi:</strong> Shukla Paksha (waxing moon) tithis are
              generally preferred; Dwitiya, Tritiya, Panchami, Saptami, Dasami,
              Trayodashi are considered auspicious.
            </li>

            <li>
              <strong>Nakshatra:</strong> Pushya, Rohini, Hasta, Anuradha,
              Uttara Phalguni, and Uttara Ashadha are favoured for new
              construction.
            </li>

            <li>
              <strong>Vara:</strong> Wednesday, Thursday, and Friday are
              generally preferred; Monday is acceptable for residential
              buildings.
            </li>

            <li>
              <strong>Rahu Kalam / Yamagandam:</strong> These inauspicious daily
              windows must be avoided for ground-breaking.
            </li>

            <li>
              <strong>Lord of the Land Direction / Janma Rashi:</strong> Some
              Vastu practitioners consider which direction is supported by the
              day's planetary lord.
            </li>
          </ul>

          <p>
            The astrologer will also consider the owner's Janma Rashi (moon
            sign) and Ascendant, ensuring the muhurat supports the individual
            beginning this specific construction journey.
          </p>
        </div>

        {/* STEPS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step-by-Step: What Happens During Bhoomi Pujan
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Site Preparation</strong> — The plot is cleaned and
              cleared. A small, sacred area — typically in the northeast or
              center of the site — is designated for the ceremony. This area is
              decorated with flowers, rangoli, and sometimes a canopy
              (shamiana).
            </li>
            <li>
              <strong>Kalash Sthapana</strong> — A brass or copper pot (kalash)
              filled with water, mango leaves, and a coconut is installed at the
              ceremonial site. The kalash represents abundance, the earth's
              fertility, and the presence of divine energy.
            </li>
            <li>
              <strong>Ganesh Puja</strong> — Every construction ceremony begins
              by invoking Lord Ganesha — the remover of obstacles, the guardian
              of new beginnings. No construction project wants obstacles. This
              puja is the formal request for a clear path.
            </li>
            <li>
              <strong>Navagraha Puja</strong> — Prayers are offered to the nine
              planetary deities (Navagrahas) to neutralise any potentially
              adverse planetary influences and invite their collective support
              for the project's success.
            </li>
            <li>
              <strong>Bhoomi Devi Puja</strong> — The heart of the ceremony. The
              priest offers flowers, fruits, sacred grains, milk, and honey to
              Mother Earth — asking her permission to disturb the land,
              promising to use it well, and requesting her blessings for
              everyone who will eventually live or work in the completed
              structure.
              <br />
              <p>
                Mantras specific to Bhoomi Devi are chanted. In Vedic tradition,
                these include prayers from the Atharva Veda's Bhoomi Suktam —
                among the oldest hymns to the earth in human literature.
              </p>
            </li>
            <li>
              <strong>Havan (Sacred Fire Ritual)</strong> — A sacred fire is lit
              and oblations are made — ghee, grains, herbs, and wooden sticks —
              accompanied by Vedic mantras. The smoke rising from the havan is
              considered purifying, clearing any negative energies from the site
              and establishing a protective field around it.
            </li>
            <li>
              <strong>Symbolic Ground-Breaking</strong> — The owner, or a senior
              family member, uses a golden or silver instrument (or a decorated
              spade) to symbolically break the ground — often at the northeast
              corner of the site. This is the moment of official beginning.
            </li>
            <li>
              <strong>Blessings, Prasad, and Community</strong> — The ceremony
              concludes with distribution of prasad (sacred food offering),
              blessings from priests and elders, and often a meal for all those
              gathered. Workers who will build the structure are frequently
              included and honoured — a recognition that their labour and safety
              matter.
            </li>
          </ol>
        </div>

        {/* CONSTRUCTION TYPES */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Bhoomi Pujan Across Different Construction Types
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Construction Type</th>
                  <th className="border p-3">Key Additions / Variations</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Residential Home</td>
                  <td className="border p-3">
                    Strong emphasis on Vastu orientation; family's birth charts
                    consulted
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Commercial Building</td>
                  <td className="border p-3">
                    Planetary positions for business success (Jupiter, Mercury)
                    emphasised
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Temple</td>
                  <td className="border p-3">
                    Extended ceremony; Agama Shastra protocols may apply
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Industrial / Factory</td>
                  <td className="border p-3">
                    Mars (industry, action) and Saturn (labour, discipline)
                    evaluated
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Agricultural Land Development</td>
                  <td className="border p-3">
                    Prayers to rain deities and crop deities may be added
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            How to Find the Right Bhoomi Pujan Muhurat in {year}
          </h2>

          <p>
            The ideal muhurat is specific to your project. Bring your astrologer
            the following details so they can calculate the most suitable
            timing:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Your date, time, and place of birth</li>
            <li>
              The plot's GPS coordinates or address (for proper Vastu
              orientation)
            </li>
            <li>Your preferred construction timeline</li>
            <li>
              The type of construction (residential home, commercial building,
              etc.)
            </li>
          </ul>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            A good Bhoomi Pujan muhurat will usually provide a window of 1–3
            hours on the chosen date. The symbolic ground-breaking should take
            place within that window, while the actual construction work can
            continue according to your regular project schedule.
          </blockquote>
        </div>

        {/* FINAL NOTE */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">A Final Note</h2>

          <p>
            Every home is built twice — once in the mind, and once in the earth.
            Bhoomi Pujan is the moment between those two realities: when the
            dream is made material, when the land accepts the beginning, and
            when the people who will live within those walls first say,
            together: this is where we begin.
          </p>

          <p>
            May the ground beneath your foundation be firm. May every wall you
            raise be a shelter. May every room hold light. 🙏
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Tags: Bhoomi Pujan {year} | Bhoomi Puja Muhurat | Ground Breaking
          Ceremony Hindu | Construction Puja | Vastu Shastra | Shubh Muhurat
          Construction | Griha Pravesh {year}
        </p>
      </div>
    </MuhuratCard>
  );
};

export default BhumiPuja;

import HeadWithLogo from "@/components/HeadWithLogo";
import MuhuratCard from "@/components/common/MuhuratCard";
import React from "react";

const GrihaPravesh = () => {
  const year = new Date().getFullYear();

  return (
    <MuhuratCard className="py-10">
      <div className="container mx-auto max-w-4xl space-y-8">
        <HeadWithLogo title={`Griha Pravesh Muhurat ${year}`} />

        {/* Kicker */}
        <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Sacred Home Entry · Vastu · Hindu Housewarming
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Griha Pravesh {year}: The Complete Guide to India's Sacred Home-Entry
          Ceremony
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg leading-relaxed">
          From choosing the right muhurat to understanding every ritual — a
          warm, practical guide for families stepping into their new home for
          the first time.
        </p>

        {/* Quick Answer */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg">⚡ QUICK ANSWER</h2>

          <p>
            Griha Pravesh is the Hindu ceremony performed when entering a new
            home for the first time. It combines Vedic purification rituals,
            prayers to Lord Ganesha and Vastu Purusha, and a sacred fire ritual
            (havan) to cleanse the space and invite positive energy.
          </p>

          <p>
            In {year}, the auspicious muhurat is calculated using the Panchang,
            the homeowner's birth chart, and Vastu Shastra principles. The ideal
            months tend to fall during Shukla Paksha periods when Jupiter is
            well placed.
          </p>
        </div>

        {/* Meaning */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            What Is Griha Pravesh — And Why Is It More Than a Housewarming?
          </h2>

          <p>
            You've signed the papers. You've packed the boxes. You've imagined
            this moment for years.
          </p>

          <p>But before you cross that threshold, there is Griha Pravesh.</p>
          <p>
            Griha (गृह) means home or house. Pravesh (प्रवेश) means entry.
            Together, Griha Pravesh is the sacred first entry into a new home —
            not just a physical crossing of a doorstep, but a deliberate,
            ceremonial welcoming of a space into your family's life and your
            family into the space.
          </p>
          <p>
            In Vedic tradition, a house is not yet truly a home until this
            ceremony is performed. The structure may be built, but the energy
            within it — the invisible fabric of atmosphere, emotion, and
            vibration that makes a house liveable — is shaped and invited
            through Griha Pravesh.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            "A house is architecture. A home is energy. Griha Pravesh is the
            ceremony that makes the transition from one to the other — purifying
            the space, aligning it with your family's energy, and beginning your
            story within its walls."
          </blockquote>

          <p>
            Unlike a Western housewarming (which is essentially a party), Griha
            Pravesh is a ritual of spiritual preparation. It acknowledges that
            any space carries the imprint of what came before — the construction
            workers, the land's history, the energies of the building process —
            and it consciously clears and reshapes that imprint before you make
            it yours.
          </p>
        </div>

        {/* Types */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            The Three Types of Griha Pravesh
          </h2>

          <p>
            Not every Griha Pravesh is the same. Vedic tradition recognises
            three distinct situations, each with its own ritual approach.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Type</th>
                  <th className="border p-3">When It Applies</th>
                  <th className="border p-3">Key Distinction</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Apoorva</td>
                  <td className="border p-3">
                    Entering a brand-new home for the first time
                  </td>
                  <td className="border p-3">
                    The most complete ceremony; full havan and Vastu Puja
                    performed
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Sapoorva</td>
                  <td className="border p-3">
                    Re-entering a home after a long absence or renovation
                  </td>
                  <td className="border p-3">
                    Shorter purification focus; re-establishing family energy in
                    the space
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Dwandwah</td>
                  <td className="border p-3">
                    Entering after a period of inauspiciousness (for example a
                    death in the family)
                  </td>
                  <td className="border p-3">
                    Specific purification rituals to clear heavy energy;
                    priest's guidance essential
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Most families today perform <strong>Apoorva Griha Pravesh</strong> —
            the ceremony for a truly new beginning. This is the most
            comprehensive and celebratory form.
          </p>
        </div>

        {/* Panchang */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Why the Muhurat Matters: Astrological Factors for Griha Pravesh{" "}
            {year}
          </h2>

          <p>
            Choosing the right muhurat for Griha Pravesh is not a formality. In
            Jyotish Shastra, the moment you enter a space for the first time
            sets the energetic tone for your life within it — much as the first
            impression of a person can shape a relationship.
          </p>

          <h3 className="text-lg font-semibold">The Five Panchang Factors</h3>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Panchang Element</th>
                  <th className="border p-3">
                    Ideal Conditions for Griha Pravesh
                  </th>
                  <th className="border p-3">What to Avoid</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Tithi (Lunar Day)</td>
                  <td className="border p-3">
                    Dwitiya, Tritiya, Panchami, Saptami, Dasami, Trayodashi
                    during Shukla Paksha
                  </td>
                  <td className="border p-3">
                    Amavasya, Chaturdashi, Ashtami, Krishna Paksha generally
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Nakshatra</td>
                  <td className="border p-3">
                    Rohini, Pushya, Hasta, Anuradha, Uttara Phalguni, Uttara
                    Ashadha, Revati
                  </td>
                  <td className="border p-3">
                    Bharani, Krittika, Ardra, Ashlesha, Jyeshtha
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Vara (Day)</td>
                  <td className="border p-3">
                    Wednesday, Thursday, Friday; Monday for domestic harmony
                  </td>
                  <td className="border p-3">
                    Saturday for new entries; Sunday situational
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Yoga</td>
                  <td className="border p-3">
                    Siddha, Amrita, Shubha, Maitra yogas preferred
                  </td>
                  <td className="border p-3">
                    Vishkambha, Vyatipata, Parigha, Vajra yogas avoided
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Lagna (Ascendant)</td>
                  <td className="border p-3">
                    Fixed signs (Taurus, Leo, Scorpio, Aquarius) for stability
                  </td>
                  <td className="border p-3">
                    Afflicted 8th house lord in the muhurat chart
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold">
            Planetary Positions to Watch in {year}
          </h3>

          <p>
            Jupiter (Guru) is the planet of home, family, and blessings. Its
            position in {year} significantly shapes which periods are most
            auspicious for Griha Pravesh. Venus (Shukra) governs domestic
            comfort and harmony — it should not be combust (too close to the
            Sun) during the muhurat window.
          </p>

          <p>
            Your astrologer will also examine your family's birth charts —
            particularly the homeowner's chart — to ensure the muhurat supports
            your specific planetary placements.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            The right Griha Pravesh muhurat in {year} is believed to fill the
            home with positive vibrations, support family harmony, invite
            prosperity, and protect all those who dwell within it.
          </blockquote>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step-by-Step: The Full Griha Pravesh Ceremony
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Pre-Ceremony Preparation:</strong> The home is cleaned
              thoroughly — every corner, every room. Fresh flowers, especially
              marigolds and roses, are arranged at the entrance. A Swastika or
              Rangoli is drawn at the threshold using rice flour or kumkum. The
              main entrance is adorned with a mango leaf torana (a string of
              leaves over the door) — an ancient Vedic symbol of abundance and
              protection.
            </li>
            <li>
              <strong>Kalash Sthapana:</strong> A brass or copper pot (kalash)
              is filled with clean water, mango leaves, and a coconut. The
              kalash is installed at the ceremony's altar, representing the
              presence of all sacred rivers, divine energy, and the fertility of
              the earth. It is the focal point for the ceremony's prayers.
            </li>
            <li>
              <strong>Ganesh Puja:</strong> Every auspicious beginning in Hindu
              tradition starts with Lord Ganesha. This short but essential puja
              formally invites the remover of obstacles into the home — asking
              that this new chapter begin without impediment.
            </li>
            <li>
              <strong>Vastu Puja:</strong> Prayers are offered to Vastu Purusha
              — the cosmic being associated with the energy and geometry of
              built spaces. This puja acknowledges the land's energy field and
              formally aligns the home with Vastu principles. The priest will
              typically offer prayers to the directions (Ashtadisha) and to the
              presiding deities of each corner of the home.
            </li>
            <li>
              <strong>Havan (Sacred Fire Ritual):</strong> The havan is the
              ceremony's spiritual core. A sacred fire is kindled, and offerings
              of ghee, grains, herbs, and sacred wood are made with Vedic
              mantras. The fire purifies the atmosphere, clears residual
              energies, and creates a protective and positive energetic field
              within the home.
              <p>
                This is also the moment when specific prayers are made for the
                family's health, peace, prosperity, and protection within this
                new space.
              </p>
            </li>
            <li>
              <strong>The Sacred Entry</strong> — This is the moment. The
              homeowner — typically accompanied by their spouse, children, and
              the family's most senior woman carrying a lit lamp — crosses the
              threshold for the first time.
              <p className="mt-2">
                Traditional customs vary by region, but common elements include:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  The wife steps in first with her right foot, carrying a pot of
                  rice or milk (symbol of abundance)
                </li>
                <li>
                  The children enter next, followed by the rest of the family
                </li>
                <li>
                  A lit lamp (diya) is carried through every room to dispel
                  darkness and invite light
                </li>
                <li>
                  Milk is boiled on the stove until it overflows — symbolising
                  abundance spilling into the home
                </li>
              </ul>
            </li>
            <li>
              <strong>Griha Shanti Puja:</strong> After the entry, prayers for
              Griha Shanti (home peace) are conducted — asking for the continued
              blessing of peace, health, and harmony for every person who lives
              or visits. Some families also perform Navagraha puja at this
              stage.
            </li>
            <li>
              <strong>Feast and Community:</strong> The ceremony concludes with
              a shared meal. Traditionally, the first food cooked in the home is
              sacred — often kheer or a sweet dish. Guests, neighbours, and
              community members are welcomed. The elders bless the home and its
              residents. The house receives its first memories.
            </li>
          </ol>
        </div>

        {/* Practical Checklist */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Practical Checklist for Families Planning Griha Pravesh in {year}
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Consult an astrologer 4–8 weeks in advance with birth details of
              the primary homeowner
            </li>
            <li>
              Confirm availability of your family priest (pandits get booked on
              popular muhurat dates)
            </li>
            <li>
              Prepare the home fully before the ceremony — any pending work
              should ideally be completed
            </li>
            <li>
              Arrange for a kalash, havan samagri (offerings), fresh flowers,
              and mango leaf torana
            </li>
            <li>
              Plan for the milk-boiling ritual — a wide vessel and full-cream
              milk work best
            </li>
            <li>
              For NRI families managing remotely, the ceremony can be led by a
              trusted elder as proxy
            </li>
            <li>
              Consider live-streaming for family members who cannot attend in
              person
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

          <p>
            <strong>Can Griha Pravesh be done in a rented home?</strong>
            <br />
            Yes. Many families perform a simplified Griha Pravesh when entering
            a rented property — typically a Ganesh Puja and havan without the
            full Vastu rituals. The intention of purifying the space and
            beginning well remains entirely valid.
          </p>

          <p>
            <strong>
              What if the auspicious date doesn't align with possession date
              from the builder?
            </strong>
            <br />
            This is common. Families sometimes take symbolic possession
            (paperwork, key collection) on a practical date, then perform the
            formal Griha Pravesh on the auspicious muhurat before actually
            moving in. Your astrologer and priest can advise on the best
            approach for your specific situation.
          </p>

          <p>
            <strong>
              Is there a waiting period after a death in the family before Griha
              Pravesh?
            </strong>
            <br />
            Yes — traditionally, families observe a period of mourning (Sutak)
            during which auspicious ceremonies are not performed. The duration
            varies by regional tradition and the relationship to the deceased.
            Your priest will advise on the appropriate waiting period and any
            additional purification rituals required.
          </p>

          <p>
            <strong>Can we perform Griha Pravesh in an apartment?</strong>
            <br />
            Absolutely. The ceremony adapts naturally to apartment living. The
            havan can be performed on the balcony or in a well-ventilated room.
            The entry rituals are performed at the flat's main door. The
            ceremony's spiritual intent is fully intact regardless of the
            building type.
          </p>

          <p>
            <strong>
              What should be the first thing cooked in the new home?
            </strong>
            <br />
            Traditionally, kheer (sweet rice pudding), pongal (in South India),
            or any sweet dish is considered auspicious — symbolising sweetness
            in the home's beginning. The boiling-over of milk is itself a form
            of first cooking. Some families make dal-rice as the first full
            meal.
          </p>
        </div>

        {/* Final Note */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">A Final Note</h2>

          <p>
            A new home is one of life's great thresholds. Behind you: everything
            that brought you here. Ahead: rooms that don't yet know your
            laughter, your arguments, your cooking smells, your morning
            routines.
          </p>

          <p>
            Griha Pravesh is the ceremony that says: let us begin this well.
            With intention. With gratitude. With the people we love most,
            gathered at the door.
          </p>

          <p>May your home hold every good thing you bring into it. 🙏</p>
        </div>

        <p className="text-sm text-gray-600">
          Tags: Griha Pravesh {year} | Griha Pravesh Muhurat | Housewarming
          Ceremony Hindu | Vastu Puja | Grihapravesam | Shubh Muhurat New Home |
          Panchang {year}
        </p>
      </div>
    </MuhuratCard>
  );
};

export default GrihaPravesh;

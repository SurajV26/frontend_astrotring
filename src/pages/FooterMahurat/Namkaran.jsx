import HeadWithLogo from "@/components/HeadWithLogo";
import MuhuratCard from "@/components/common/MuhuratCard";
import React from "react";

const Namkaran = () => {
  const year = new Date().getFullYear();

  return (
    <MuhuratCard className="py-10">
      <div className="container mx-auto max-w-4xl space-y-8">
        <HeadWithLogo title={`Namkaran Muhurat ${year}`} />

        <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Hindu Naming Ceremony · Shodasha Samskaras
        </p>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Namkaran {year}: The Complete Guide to Your Baby's Hindu Naming
          Ceremony
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          Everything modern families need to know — from astrological muhurat to
          regional rituals — written for real people navigating a beautiful
          tradition.
        </p>

        {/* QUICK ANSWER */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg">⚡ QUICK ANSWER</h2>

          <p>
            Namkaran (also Namakarana) is the Hindu naming ceremony performed to
            give a newborn their lifelong name. It is traditionally held on the
            11th or 12th day after birth, or on an auspicious muhurat selected
            from the Panchang.
          </p>

          <p>
            In {year}, the ideal date depends on the baby's birth chart, the
            lunar calendar, and planetary positions — a qualified Jyotishi can
            calculate personalised timings.
          </p>
        </div>

        {/* WHAT IS NAMKARAN */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            What Is Namkaran — And Why Does a Name Matter So Much?
          </h2>

          <p>
            A name is the first gift a family gives a child. In Hindu tradition,
            it is also a sacred one.
          </p>

          <p>
            Namkaran (from Sanskrit: Nama = name, Karana = to make or give) is
            the formal naming ceremony — one of the sixteen Shodasha Samskaras
            that mark the key thresholds of a Hindu life. It is the moment a
            child moves from “the baby” to a named individual: a soul with an
            identity, anchored in family, community, and the cosmos.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            "In Vedic thought, a name carries vibration. The sounds spoken over
            a child, repeated by every voice that loves them, shape the energy
            that surrounds their life."
          </blockquote>

          <p>
            But Namkaran is also deeply human. It is the gathering of everyone
            who matters — grandparents who have waited months to say the name
            aloud, relatives who share blessings, and friends who celebrate the
            new arrival. It is a child's very first introduction to the world.
          </p>
        </div>

        {/* ASTROLOGICAL LOGIC */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            The Astrological Logic Behind Namkaran Muhurat in {year}
          </h2>

          <p>
            The Namkaran muhurat is not chosen arbitrarily. Vedic astrology
            (Jyotish Shastra) teaches that the moment a ceremony is performed
            carries its own energy — and that beginning something significant
            during an auspicious window aligns the child's journey with
            supportive cosmic forces.
          </p>

          <p>Your astrologer will study five elements of the Panchang:</p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Panchang Element</th>
                  <th className="border p-3">What It Is</th>
                  <th className="border p-3">Why It Matters for Namkaran</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Tithi</td>
                  <td className="border p-3">Lunar day</td>
                  <td className="border p-3">
                    Shukla Paksha (waxing moon) tithis are preferred for new
                    beginnings
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Nakshatra</td>
                  <td className="border p-3">Moon's constellation</td>
                  <td className="border p-3">
                    Pushya, Ashwini, and Swati are favourable for naming
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Vara</td>
                  <td className="border p-3">Day of the week</td>
                  <td className="border p-3">
                    Wednesday (Mercury) and Thursday (Jupiter) support intellect
                    and wisdom
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Yoga</td>
                  <td className="border p-3">Sun-moon combination</td>
                  <td className="border p-3">
                    Siddha and Amrita yogas bring success and longevity
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Karana</td>
                  <td className="border p-3">Half-day division</td>
                  <td className="border p-3">
                    Auspicious karanas like Bava and Balava are preferred
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Additionally, Rahu Kalam and Ketu Kalam — daily windows considered
            inauspicious — are carefully avoided.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            The right Namkaran muhurat in {year} is believed to set a positive
            energetic foundation for the child's identity — supporting their
            intelligence, health, and overall life trajectory.
          </blockquote>
        </div>

        {/* STEPS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step-by-Step: What Happens During Namkaran
          </h2>

          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Preparation and Purification</strong> — The home is
              cleaned thoroughly — spiritually and practically. An altar is
              arranged with idols or images of Lord Ganesha and Goddess
              Saraswati (goddess of learning and wisdom). The baby is bathed and
              dressed in fresh, often traditional, clothes.
            </li>

            <li>
              <strong>Ganesh Puja</strong> — Every auspicious Hindu ceremony
              begins by invoking Ganesha, the remover of obstacles. This short
              prayer sets a clear, protected intention for everything that
              follows.
            </li>

            <li>
              <strong>Sankalp</strong> — Parents or elders make a formal
              declaration of intent — the sankalp — stating the purpose of the
              ceremony and praying for the child's long life, health, and
              wisdom. This is often led by the family priest.
            </li>

            <li>
              <strong>Havan and Saraswati Prayers</strong> — A sacred fire
              ritual (havan) is performed with offerings and mantras. Prayers to
              Goddess Saraswati invite blessings of knowledge, articulation, and
              intellectual strength for the child.
            </li>

            <li>
              <strong>The Name Announcement</strong> — The baby's name is
              revealed. Depending on regional tradition, this may happen in one
              of several ways:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  The name is whispered into the baby's right ear by the father
                  or grandfather
                </li>
                <li>
                  It is written on a sacred plate, thali, or betel leaf with a
                  golden stylus or rice
                </li>
                <li>
                  It is announced aloud to the assembled family for the first
                  time
                </li>
              </ul>
              <p>
                Often, the formal name (by which the child will be known in
                official life) is accompanied by a pet name or nickname — the
                name of everyday tenderness.
              </p>
            </li>

            <li>
              <strong>Blessings and Celebration</strong> — Elders touch the
              baby's head and offer blessings. Guests present gifts — gold
              jewellery, clothing, sweets, or savings. A shared meal follows,
              making the occasion truly celebratory.
            </li>
          </ol>
        </div>

        {/* REGIONAL TRADITIONS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Regional Naming Traditions Across India
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Region</th>
                  <th className="border p-3">Local Flavour</th>
                  <th className="border p-3">Special Elements</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">North India</td>
                  <td className="border p-3">Prayers and sweets</td>
                  <td className="border p-3">
                    Laddoos, kheer; name written on rice
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">South India</td>
                  <td className="border p-3">Deity centred ceremony</td>
                  <td className="border p-3">Prayers to Vishnu or Lakshmi</td>
                </tr>

                <tr>
                  <td className="border p-3">West Bengal</td>
                  <td className="border p-3">Name + first food blend</td>
                  <td className="border p-3">Mukhe Bhaat tradition</td>
                </tr>

                <tr>
                  <td className="border p-3">Maharashtra</td>
                  <td className="border p-3">Formal puja</td>
                  <td className="border p-3">Modaks and Puran Poli</td>
                </tr>

                <tr>
                  <td className="border p-3">Gujarat</td>
                  <td className="border p-3">Community celebration</td>
                  <td className="border p-3">Garba and sweets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* MUHURAT GUIDE */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            How to Find the Right Namkaran Muhurat in {year}
          </h2>

          <p>
            There is no universal “best date”. The ideal Namkaran muhurat
            depends on the baby's birth chart and family tradition.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Baby's date, time, and place of birth</li>
            <li>Your regional tradition</li>
            <li>Preferred timeframe (11–40 days after birth)</li>
          </ul>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            <p className="font-semibold">Recommended:</p>
            Consult a qualified Jyotishi with your baby's exact birth details.
            Many temples and family priests provide this service, and it is
            widely available online for diaspora families. Your astrologer will
            typically offer 2–4 suitable dates, ranked by auspiciousness.
          </blockquote>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

          <p>
            <strong>On which day is Namkaran usually done?</strong>
            <br />
            Traditionally on the 11th or 12th day after birth, once the mother
            has completed initial post-birth rest. Some families choose the
            100th day or another astrologically auspicious date if the early
            window isn't practical.
          </p>

          <p>
            <strong>Can we do Namkaran without a pandit?</strong>
            <br />
            Yes. A senior family member can lead the prayers with full
            sincerity. The ceremony's power lies in the love, intention, and
            community present — not solely in ritual complexity.
          </p>

          <p>
            <strong>What if we haven't decided the name?</strong>
            <br />
            Many families use the Namkaran as the deadline — the ceremony itself
            finalises the choice. A name beginning with the letter suggested by
            the birth Nakshatra (the Naam Akshar) is traditionally recommended
            by Vedic astrologers.
          </p>

          <p>
            <strong>Is Namkaran only for Hindus?</strong>
            <br />
            Namkaran is rooted in Hindu tradition, but naming ceremonies exist
            across South Asian cultures. Sikhs have the Naam Karan ceremony at
            the Gurdwara; Muslim families perform Aqiqah; Jain families have
            their own naming traditions.
          </p>
        </div>

        {/* FINAL NOTE */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">A Final Note</h2>

          <p>
            Every culture has a way of saying: you have arrived, you belong, you
            are known.
          </p>

          <p>
            Namkaran is the Hindu tradition's answer — a name chosen with care,
            spoken with love, and echoed by every voice in the room.
          </p>

          <p>
            Whatever name you choose, and whenever you choose it: may it carry
            only light.
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Tags: Namkaran {year} | Namkaran Muhurat | Hindu Naming Ceremony |
          Baby Naming Ritual India | Namakarana Sanskar | Jyotish Shastra |
          Shodasha Samskaras
        </p>
      </div>
    </MuhuratCard>
  );
};

export default Namkaran;

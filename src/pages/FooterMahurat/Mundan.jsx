import HeadWithLogo from "@/components/HeadWithLogo";
import MuhuratCard from "@/components/common/MuhuratCard";
import React from "react";

const Mundan = () => {
  const year = new Date().getFullYear();

  return (
    <MuhuratCard className="py-10">
      <div className="container mx-auto max-w-4xl space-y-8">
        <HeadWithLogo title={`Mundan Muhurat ${year}`} />

        {/* Kicker */}
        <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Mundan Sanskar · Chudakarana · First Haircut Ceremony
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Mundan Ceremony {year}: The Complete Guide to Your Child's Sacred
          First Haircut
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg leading-relaxed">
          More than just a haircut — a complete guide to the Mundan Sanskar, its
          spiritual meaning, the right muhurat in {year}, and what actually
          happens on the day.
        </p>

        {/* Quick Answer */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg">⚡ QUICK ANSWER</h2>

          <p>
            Mundan (also called Chudakarana, Chutak, or Mundan Sanskar) is the
            Hindu ceremony of a child's first haircut. It is one of the sixteen
            Shodasha Samskaras and is traditionally performed between the
            child's 1st and 3rd year.
          </p>

          <p>
            In {year}, the ideal Mundan muhurat is calculated using the child's
            birth chart, Panchang, and the moon's Nakshatra. The ceremony is
            believed to remove negative energy carried from birth and bless the
            child with health, intelligence, and a protected future.
          </p>
        </div>

        {/* Meaning */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            What Is Mundan — And Why Is a Haircut Sacred?
          </h2>

          <p>
            At first, it may seem unusual to mark something as simple as a
            haircut with a ceremony. But in Vedic tradition, hair represents the
            body's first growth — present even before birth and believed to
            carry the subtle impressions of the womb and the earliest months of
            life.
          </p>

          <p>
            Removing this birth hair is therefore seen as an act of renewal. The
            child symbolically begins a fresh chapter — free from past
            influences and ready to grow with clarity, strength, and protection.
            The act of shaving the head becomes not just a physical change, but
            a spiritual transition.
          </p>

          <p>
            The word <strong>Mundan (मुण्डन)</strong> comes from the Sanskrit
            root
            <em> munda</em>, meaning “shaved head.” The ceremony is also known
            as
            <strong> Chudakarana</strong> — where <em>chuda</em> refers to the
            small tuft of hair (shikha) traditionally left at the crown, and{" "}
            <em>karana</em> means “to perform.”
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            "Mundan is not about hair. It is about what hair represents — the
            first chapter of a child's life. The ceremony closes that chapter
            and opens a new one: cleaner, lighter, protected, and blessed."
          </blockquote>

          <p>
            For many families, Mundan becomes the first major ceremony where the
            child takes centre stage. The child may not fully understand the
            ritual, but they react to the sounds, the people, and the atmosphere
            around them. Years later, photographs and family stories often
            preserve this day as one of the most emotional and memorable moments
            of early childhood.
          </p>
        </div>

        {/* Spiritual Dimensions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            The Spiritual and Scientific Dimensions of Mundan Sanskar
          </h2>

          <p>
            Mundan operates at two levels simultaneously — the spiritual and the
            practical — and both deserve respect.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Dimension</th>
                  <th className="border p-3">
                    What Mundan Is Believed to Accomplish
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Spiritual (Vedic)</td>
                  <td className="border p-3">
                    Removes karmic or negative energies carried from the womb
                    and early infancy.
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Spiritual (Ritual)</td>
                  <td className="border p-3">
                    Connects the child with cosmic energies and invites divine
                    protection for the journey ahead.
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Physical (Traditional belief)</td>
                  <td className="border p-3">
                    Birth hair is considered spiritually unclean; its removal
                    marks a fresh bodily beginning.
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Developmental (Modern lens)</td>
                  <td className="border p-3">
                    Many families observe that children seem more energetic and
                    settled after Mundan — an anecdotal pattern across
                    generations.
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Social</td>
                  <td className="border p-3">
                    Formally introduces the child to the community as an
                    individual with a name, a story, and now a new head of hair
                    growing entirely on their own terms.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            It is worth noting that modern Ayurveda and some paediatric
            traditions in India also suggest that shaving the birth hair may
            allow new, stronger hair growth — though this remains anecdotal and
            varies by individual.
          </p>
        </div>

        {/* Timing */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            When Should Mundan Be Done? Age and Timing in {year}
          </h2>

          <p>Tradition offers a clear but flexible window:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Most commonly: the end of the 1st year or during the 3rd year (odd
              years are preferred in many traditions)
            </li>
            <li>
              Some families perform Mundan in the 5th or 7th year, particularly
              in certain South Indian traditions
            </li>
            <li>
              The exact age is guided by the child's birth Nakshatra and the
              family's regional customs
            </li>
          </ul>

          <p>The ceremony is traditionally avoided during:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>The child's birth month (same lunar month as birth)</li>
            <li>When the mother is pregnant (in many regional traditions)</li>
            <li>
              During Pitru Paksha (ancestral fortnight usually observed in
              September–October)
            </li>
            <li>
              Ashaucha (periods of ritual impurity following birth or death in
              the family)
            </li>
          </ul>
        </div>

        {/* Muhurat */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Choosing the Right Mundan Muhurat in {year}
          </h2>

          <p>
            The muhurat for Mundan is selected with care — because the moment of
            the ceremony is understood to shape the child's path forward.
          </p>

          <h3 className="text-lg font-semibold">Key Astrological Factors</h3>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Factor</th>
                  <th className="border p-3">Favourable Conditions</th>
                  <th className="border p-3">Notes</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">Tithi</td>
                  <td className="border p-3">
                    Dwitiya, Tritiya, Panchami, Saptami, Dasami, Ekadashi,
                    Trayodashi
                  </td>
                  <td className="border p-3">
                    Shukla Paksha (waxing moon) strongly preferred
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Nakshatra</td>
                  <td className="border p-3">
                    Ashwini, Pushya, Hasta, Rohini, Mrigashira, Swati, Anuradha,
                    Revati
                  </td>
                  <td className="border p-3">
                    Child's birth Nakshatra is typically avoided
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Vara (Day)</td>
                  <td className="border p-3">
                    Monday (Moon), Wednesday (Mercury), Thursday (Jupiter),
                    Friday (Venus)
                  </td>
                  <td className="border p-3">
                    Saturday and Tuesday generally avoided
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Moon Sign</td>
                  <td className="border p-3">
                    Moon in favourable position relative to child's Janma Rashi
                  </td>
                  <td className="border p-3">
                    Check child's birth chart specifically
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Rahu / Ketu</td>
                  <td className="border p-3">
                    Avoid Rahu Kalam and Ketu Kalam on the day
                  </td>
                  <td className="border p-3">
                    Varies daily — check local Panchang
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            Your astrologer will work from the child's birth details — date,
            time, and place — to calculate the Janma Kundali (birth chart) and
            identify muhurat windows that align well with the child's specific
            planetary signature.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            A well-chosen Mundan muhurat in {year} is believed to bless the
            child with strong immunity, mental clarity, and positive life energy
            — removing old influences and welcoming the child into a renewed,
            auspicious beginning.
          </blockquote>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step-by-Step: What Happens During the Mundan Ceremony
          </h2>

          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Selection of Venue</strong> — Mundan is traditionally
              performed at a temple, at the family home, or at a sacred river or
              pilgrimage site. The Varanasi ghats, Tirupati, Ujjain, and
              Haridwar are among the most revered Mundan locations in India —
              families often travel specifically to these places for the
              ceremony's spiritual significance.
              <p className="mt-2">
                For families in cities or abroad, the home or a local temple is
                completely appropriate.
              </p>
            </li>

            <li>
              <strong>Preparation and Ganesh Puja</strong> — The child is bathed
              and dressed in traditional clothes — often a bright dhoti or silk
              outfit. An altar is prepared with flowers, a kalash, incense, and
              images of the family’s chosen deities. Ganesh Puja is performed to
              clear the way and invite blessings.
            </li>

            <li>
              <strong>Sankalp — The Sacred Vow</strong> — The parents or elders
              make a formal sankalp (declaration of intent), stating the child's
              name, birth details, and the purpose of the ceremony. This vow is
              addressed to the divine and witnessed by all present.
            </li>

            <li>
              <strong>Puja and Mantras</strong> — The priest offers prayers —
              typically to the child’s Ishta Devata (family deity) and the
              Navagrahas (nine planetary deities) — invoking blessings for the
              child’s health, intelligence, and long life.
            </li>

            <li>
              <strong>The Shaving — The Heart of the Ceremony</strong> — The
              traditional barber (Nai) performs the first shave. In some
              families, the father makes the first symbolic stroke with a blade
              before the barber continues.
              <p className="mt-2">
                The hair is carefully collected — often placed on a banana leaf
                with flowers and offerings — and later immersed in a sacred
                river or water body as a ritual release.
              </p>
              <p className="mt-2">
                The <strong>shikha</strong> (small tuft at the crown) may be
                left if the family follows this tradition — it is considered a
                protective spiritual symbol.
              </p>
            </li>

            <li>
              <strong>Head Paste Application</strong> — After shaving, a cooling
              paste is applied to the child’s scalp — often turmeric and
              sandalwood, or simply oil and water. This helps soothe the skin
              and provides cooling relief.
            </li>

            <li>
              <strong>Blessings, Gifts, and Celebration</strong> — Elders bless
              the child and prasad is distributed. Families celebrate together —
              often with a meal, music, and joyful gatherings.
            </li>
          </ol>
        </div>

        {/* Regional Variations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Mundan Across India: Regional Flavours
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Region</th>
                  <th className="border p-3">Local Name</th>
                  <th className="border p-3">Distinctive Elements</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">North India</td>
                  <td className="border p-3">Mundan / Chutak</td>
                  <td className="border p-3">
                    Ceremony often held at Varanasi or Mathura; hair offered to
                    Ganga
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">South India</td>
                  <td className="border p-3">Chudakarma</td>
                  <td className="border p-3">
                    Temple ceremonies common; Tirupati among the most revered
                    locations
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Bengal</td>
                  <td className="border p-3">Chul Karana</td>
                  <td className="border p-3">
                    Often performed at age 1 or 3; mother plays a central role
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Maharashtra</td>
                  <td className="border p-3">Jaawal / Chudakarana</td>
                  <td className="border p-3">
                    Maternal uncle (Mama) performs the first ritual stroke
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Gujarat</td>
                  <td className="border p-3">Mundan</td>
                  <td className="border p-3">
                    Hair sometimes weighed and equal weight in silver donated
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Rajasthan</td>
                  <td className="border p-3">Mundan</td>
                  <td className="border p-3">
                    Ceremony often held at the family Kuldevi temple
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Practical Tips for Parents Planning Mundan in {year}
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Book the barber in advance — traditional family barbers are in
              high demand on auspicious dates.
            </li>
            <li>
              Bring a favourite toy or snack for the child — the sensation of
              shaving can be startling and distracting them helps enormously.
            </li>
            <li>
              Have a soft cloth and gentle post-shave oil ready — even the most
              skilled barber may leave small irritation.
            </li>
            <li>
              Plan the ceremony for a time when the child is naturally rested
              and fed — not during their usual nap window.
            </li>
            <li>
              For temple ceremonies, check the temple's specific timings and
              whether prior booking is required.
            </li>
            <li>
              Keep the celebration manageable for the child's age — a toddler
              can only absorb so many hugs before overwhelm sets in.
            </li>
            <li>
              Take photos before as well as after — the transformation is one of
              the most striking you'll see in early childhood.
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

          <p>
            <strong>Is it okay to skip Mundan?</strong>
            <br />
            Many modern families do choose not to perform Mundan, particularly
            outside India or when it is difficult to find the right conditions.
            The ceremony is deeply meaningful for those who follow it — but it
            is ultimately a personal and family decision. If you hold the
            intention and do what you can within your circumstances, that
            carries its own validity.
          </p>

          <p>
            <strong>Does Mundan have to happen at a temple?</strong>
            <br />
            No. While temple ceremonies carry a particular energy, Mundan at
            home with a family priest is fully valid and very common. What
            matters is the sincerity of the ritual, not the venue.
          </p>

          <p>
            <strong>My child is already 3 — is it too late?</strong>
            <br />
            No. While traditional timing suggests the 1st or 3rd year, Mundan
            can be performed up to the 5th or 7th year in many traditions. If
            you missed the earlier window, consult your astrologer — there will
            be a suitable date available.
          </p>

          <p>
            <strong>What if the child cries throughout?</strong>
            <br />
            They almost certainly will. This is completely normal and does not
            diminish the ceremony's significance in any way. Every parent and
            grandparent in the room has a version of this story. The ceremony
            proceeds with love, patience, and usually a generous number of
            raisins or biscuits.
          </p>

          <p>
            <strong>
              Should we do Mundan before or after the first birthday?
            </strong>
            <br />
            Many families prefer the end of the 1st year — typically in the 11th
            or 12th month — before the first birthday. Others wait for the 3rd
            year. Both are valid. Your astrologer and family tradition are the
            best guides here.
          </p>
        </div>

        {/* Final Note */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">A Final Note</h2>

          <p>
            Childhood moves faster than anyone warns you. One day there is this
            new person, weightless and wondering, with a full head of birth
            hair. And then, in a room full of people who love them, that first
            chapter is gently released.
          </p>

          <p>
            Mundan is the ceremony that marks the moment your child steps,
            cleanly and freshly, into the rest of their story.
          </p>

          <p>May every step that follows be blessed. 🙏</p>
        </div>

        <p className="text-sm text-gray-600">
          Tags: Mundan {year} | Mundan Muhurat | Chudakarana Ceremony | First
          Haircut Hindu | Mundan Sanskar | Shubh Muhurat Baby | Shodasha
          Samskaras | Panchang {year}
        </p>
      </div>
    </MuhuratCard>
  );
};

export default Mundan;

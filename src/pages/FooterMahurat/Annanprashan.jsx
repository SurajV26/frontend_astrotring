import HeadWithLogo from "@/components/HeadWithLogo";
import MuhuratCard from "@/components/common/MuhuratCard";
import React from "react";

const Annanprashan = () => {
  const year = new Date().getFullYear();

  return (
    <MuhuratCard className="py-10">
      <div className="container mx-auto max-w-4xl space-y-8">
        <HeadWithLogo title={`Annaprashan Muhurat ${year}`} />

        <p className="text-sm font-semibold tracking-widest text-orange-600 uppercase">
          Sacred First Bites
        </p>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Annaprashan {year}: The Complete Guide to Your Baby's First Food
          Ceremony
        </h1>

        <p className="text-gray-700 text-lg leading-relaxed">
          Everything you need to know — from meaning and muhurat to rituals and
          regional traditions — written for modern families who want to honour
          this milestone mindfully.
        </p>

        {/* QUICK ANSWER */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-lg">⚡ QUICK ANSWER</h2>

          <p>
            Annaprashan (also called Annaprashana) is the Hindu ceremony marking
            a baby's first taste of solid food. It is traditionally performed
            between the 5th and 7th month for boys, and the 6th or 8th month for
            girls. The {year} muhurat (auspicious timing) is calculated using
            the child's birth chart, Panchang, and Jyotish Shastra. Always
            consult a qualified astrologer for a personalised date.
          </p>
        </div>

        {/* WHAT IS ANNAPRASHAN */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            What Is Annaprashan? (And Why Does It Matter?)
          </h2>

          <p>
            If you've ever watched a parent offer their baby that first spoonful
            of kheer — eyes wide, the whole family holding their breath — you've
            witnessed Annaprashan.
          </p>

          <p>
            In Sanskrit, Anna (अन्न) means food, and Prashan (प्राशन) means to
            feed or taste. Together, Annaprashan marks the sacred moment a child
            moves from mother's milk to the nourishment of the earth. It is one
            of the sixteen Shodasha Samskaras — the rites of passage in Hindu
            tradition that mark every significant threshold of a human life.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            "This ceremony is not just about food. It is about welcoming a child
            into the world of shared human experience — the joy of taste, the
            comfort of community, and the blessings of ancestors."
          </blockquote>

          <p>
            But beyond the spiritual, there is also the practical: Annaprashan
            is the moment families begin the gradual shift in a baby's
            nutrition. It aligns ancient wisdom with what modern paediatrics now
            confirms — that around 6 months, most babies are developmentally
            ready for solid foods.
          </p>
        </div>

        {/* REGIONAL VARIATIONS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Annaprashan by Another Name: Regional Variations Across India
          </h2>

          <p>
            India does not celebrate this ceremony in one voice — it celebrates
            it in many. Same sacred purpose, beautifully different expressions.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3">Region</th>
                  <th className="border p-3">Local Name</th>
                  <th className="border p-3">Traditional First Food</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="border p-3">West Bengal</td>
                  <td className="border p-3">Bhatkhulai / Mukhe Bhaat</td>
                  <td className="border p-3">
                    Rice (bhat), kheer, fish (for non-vegetarian families)
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">North India</td>
                  <td className="border p-3">Annaprashan</td>
                  <td className="border p-3">Kheer, halwa, and sweets</td>
                </tr>

                <tr>
                  <td className="border p-3">South India</td>
                  <td className="border p-3">Choroonu / Annaprasana</td>
                  <td className="border p-3">
                    Rice with curd, ghee, and banana
                  </td>
                </tr>

                <tr>
                  <td className="border p-3">Maharashtra</td>
                  <td className="border p-3">Annaprashan</td>
                  <td className="border p-3">Modaks, Puran Poli, and rice</td>
                </tr>

                <tr>
                  <td className="border p-3">Odisha</td>
                  <td className="border p-3">Anna Prashan</td>
                  <td className="border p-3">Kheer and rice with ghee</td>
                </tr>

                <tr>
                  <td className="border p-3">Gujarat</td>
                  <td className="border p-3">Annaprashan</td>
                  <td className="border p-3">Kheer, rice, and dal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            The Astrological Importance of Annaprashan in {year}
          </h2>

          <p>
            In Jyotish Shastra (Vedic astrology), timing is not incidental — it
            is everything. The muhurat for Annaprashan in {year} is chosen to
            align the child's emerging life energy with supportive cosmic
            forces.
          </p>

          <p>
            This is not superstition. It is a framework of accumulated
            observation, refined over centuries, that seeks to give a child the
            most auspicious start possible.
          </p>

          <h3 className="text-lg font-semibold">
            What Goes Into Calculating the Muhurat?
          </h3>

          <p>
            A qualified Jyotishi (Vedic astrologer) considers five key elements
            from the Panchang:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Tithi</strong> — The lunar day. Certain tithis are
              associated with vitality, growth, and auspiciousness for children.
            </li>

            <li>
              <strong>Nakshatra</strong> — The moon's position in a
              constellation. Nakshatras like Rohini, Pushya, and Hasta are
              considered especially favourable.
            </li>

            <li>
              <strong>Yoga</strong> — The combined position of the sun and moon.
              Siddha and Amrita yogas are preferred.
            </li>

            <li>
              <strong>Karana</strong> — The half-day division. Bava, Balava, and
              Kaulava karanas are considered suitable.
            </li>

            <li>
              <strong>Vara</strong> — The day of the week. Wednesday (Mercury),
              Thursday (Jupiter), and Friday (Venus) are generally auspicious
              for ceremonies.
            </li>
          </ul>

          <p>
            Additionally, the astrologer will avoid Rahu Kalam and Ketu Kalam —
            windows of time each day considered inauspicious for new beginnings.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            The right muhurat in {year} is believed to support the child's
            immunity, digestive strength, mental clarity, and overall well-being
            — setting the foundation for a healthy, prosperous life.
          </blockquote>
        </div>

        {/* STEP BY STEP */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Step-by-Step: What Happens During Annaprashan
          </h2>

          <p>
            Here is what a traditional ceremony typically looks like — though
            your family may adapt it based on your regional customs and personal
            preferences.
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Purification and Preparation</strong> — The home is
              cleaned thoroughly. An altar is set up with images or idols of
              Goddess Annapurna (the goddess of food and nourishment) and Lord
              Ganesha (the remover of obstacles). The baby is bathed, dressed in
              new clothes — often traditional silk or cotton in bright,
              celebratory colours.
            </li>

            <li>
              <strong>Ganesh Puja</strong> — Every auspicious ceremony begins by
              invoking Ganesha. This short puja sets a positive, obstacle-free
              intention for the ritual ahead.
            </li>

            <li>
              <strong>Sankalp</strong> — The parents or elders make a formal vow
              (sankalp), stating the purpose of the ritual and praying for the
              child's health, longevity, and happiness. This is often done by a
              family priest or pandit.
            </li>

            <li>
              <strong>Annapurna Puja and Havan</strong> — Prayers are offered to
              Goddess Annapurna, who presides over food and its nourishing
              power. In many families, a small havan (sacred fire ritual) is
              performed, with offerings made to invoke blessings.
            </li>

            <li>
              <strong>The First Feeding — The Heart of the Ceremony</strong> —
              This is the moment everyone has gathered for. The father,
              grandfather, or maternal uncle (depending on regional tradition)
              offers the baby their first bite of solid food.
              <p className="mt-2">The food is typically:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Rice kheer (sweet rice pudding) — across most of North and
                  West India
                </li>
                <li>
                  Plain rice with ghee and a drop of honey — in South India
                </li>
                <li>Cooked rice (bhat) — in Bengal</li>
              </ul>
              <p className="mt-2">
                The baby's reaction — whether they accept the food eagerly or
                turn away — is often read as an omen for their nature.
                Enthusiastic eating? A healthy, hearty child. A reluctant baby?
                Time for jokes at the expense of the parents.
              </p>
            </li>

            <li>
              <strong>The Plate Game (Optional but Beloved)</strong> — Many
              families include a lighthearted ritual where several objects are
              placed before the baby: a book (intelligence), soil or a pen
              (wealth or work), food (love of nourishment), jewellery (material
              comfort), or a ball (sport). Whatever the baby reaches for first
              is said to predict their future inclinations. It is, of course,
              taken with affection — not gravity.
            </li>

            <li>
              <strong>Blessings and Gifts</strong> — Elders touch the baby's
              head and offer blessings. Guests present gifts — gold jewellery is
              traditional, though books, clothing, and savings deposits are
              equally common today. The family shares a meal together,
              celebrating this milestone in community.
            </li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Shubh Muhurat for Annaprashan {year}: How to Find the Right Date
          </h2>

          <p>
            There is no single universal muhurat for Annaprashan in {year}. The
            correct date and time depends on:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              The baby's date, time, and place of birth (to calculate their
              Janma Kundali or birth chart)
            </li>
            <li>The baby's current age and the phase of the moon</li>
            <li>Regional customs and family traditions</li>
            <li>Availability of family members</li>
          </ul>

          <p>
            General auspicious months in {year} for Annaprashan ceremonies
            include periods when Jupiter (the planet of wisdom and growth) is in
            a favourable position — but this requires personalised calculation.
          </p>

          <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-700">
            <p className="font-semibold">Recommended:</p>
            Consult a qualified Jyotishi (Vedic astrologer) with your baby's
            exact birth details. Many temples and family priests offer this
            service, and it is increasingly available online for families living
            abroad.
          </blockquote>

          <p>
            What your astrologer will produce is a shortlist of 2–4 ideal dates
            and times, ranked by auspiciousness. You then choose the one that
            works best practically — because a ceremony attended with joy by the
            whole family is worth more than a technically perfect muhurat
            celebrated alone.
          </p>
        </div>

        {/* PRACTICAL TIPS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Practical Tips for Modern Families
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Invite your paediatrician into the conversation. If your baby
              isn't quite ready for solids at the astrologically auspicious
              date, speak with your doctor. You can sometimes choose a nearby
              alternative muhurat, or perform the ceremony symbolically with a
              tiny taste.
            </li>
            <li>
              Keep the first food simple. Whatever tradition you follow, the
              first offering should be easy to digest — a small amount of
              well-cooked rice, kheer, or mashed banana.
            </li>
            <li>
              Capture the moment, but stay present. Have a designated
              photographer so parents can focus on the experience rather than
              their phones.
            </li>
            <li>
              Make it accessible. If elderly grandparents are joining from
              abroad via video call, set up a stable connection beforehand. The
              live experience of their blessing — even digitally — matters
              enormously.
            </li>
            <li>
              Brief guests in advance. For families with non-Hindu guests, a
              short written note explaining the ceremony's significance helps
              everyone feel included and engaged.
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>

          <p>
            <strong>What is the best age for Annaprashan?</strong>
            <br />
            Traditionally, the 6th month for boys and the 6th or 8th month for
            girls — though many families follow the 5th–8th month window based
            on astrological guidance. Modern paediatric guidance also recommends
            starting solids around 6 months.
          </p>

          <p>
            <strong>Can Annaprashan be done at home without a pandit?</strong>
            <br />
            Yes. Many families perform a simplified ceremony at home with a
            senior family member leading the prayers. The spiritual intention
            and the love in the room matter more than elaborate ritual
            correctness.
          </p>

          <p>
            <strong>Is Annaprashan only for Hindus?</strong>
            <br />
            Annaprashan is rooted in Hindu tradition, but similar first-food
            ceremonies exist across South Asian cultures, including in Sikh and
            Jain communities, sometimes under different names.
          </p>

          <p>
            <strong>
              What if the auspicious date doesn't work for our family?
            </strong>
            <br />
            Speak to your astrologer. There are usually multiple suitable
            muhurats within a month. The ceremony's spirit lies in the intention
            and joy behind it — not rigid date compliance.
          </p>
        </div>

        {/* FINAL NOTE */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold">A Final Note</h2>

          <p>
            Every culture has a way of saying: you are part of us now. You will
            eat what we eat, taste what we taste, be sustained by the same
            earth.
          </p>

          <p>
            Annaprashan is India's way of saying exactly that — with a spoonful
            of kheer, a room full of love, and centuries of intention behind
            every grain.
          </p>

          <p>
            Whether you're planning a ceremony or simply trying to understand
            one you've been invited to: welcome to the table.
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Tags: Annaprashan {year} | Annaprashan Muhurat | First Food Ceremony
          Hindu | Bhatkhulai | Baby Milestones India | Hindu Samskaras | Jyotish
          Shastra
        </p>
      </div>
    </MuhuratCard>
  );
};

export default Annanprashan;

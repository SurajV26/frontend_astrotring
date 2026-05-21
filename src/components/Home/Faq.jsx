import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ComponentHead from "../ComponentHead";
import { Link } from "react-router-dom";

const faqData = [
  {
    id: 8,
    que: "How do I consult an online astrologer?",
    ans: (
      <>
        It's quite simple. Visit{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        , browse through our carefully verified astrologers based on their
        expertise, ratings, and reviews, and book a session via chat, call, or
        video call. You'll need to share your birth date, time, and place. Your
        astrologer will then analyze your chart and address your specific
        questions with care and clarity. We also offer free introductory
        sessions so you can get comfortable before committing to a full
        consultation.
      </>
    ),
  },
  {
    id: 9,
    que: "How can astrology help in love, marriage, and relationships?",
    ans: (
      <>
        Astrology can reveal a great deal about how you relate to others — your
        emotional needs, communication style, and what you seek in a partner. At{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        , our Kundli matching service compares two birth charts to assess
        compatibility in values, temperament, and long-term harmony. We also
        help identify the right timing for relationships and marriage. Many
        couples find that understanding each other's astrological makeup —
        guided by our experts — brings more empathy, patience, and depth to
        their relationship.
      </>
    ),
  },
  {
    id: 10,
    que: "What role does astrology play in career and finance?",
    ans: (
      <>
        Your birth chart contains clear indicators about your natural talents,
        suitable career fields, and the timing of professional growth or
        challenges. At {" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">AstroTring.com</strong>
        </Link>{" "}
        , our astrologers help you identify the
        right planetary periods for starting a business, seeking a promotion, or
        making investments — while also guiding you on when to exercise
        patience. Astrology doesn't replace hard work, but combined with
        {" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">AstroTring.com's</strong>
        </Link>{" "}
        expert guidance, it helps you align your efforts
        with the right cosmic timing for better outcomes.
      </>
    ),
  },
  {
    id: 11,
    que: "Can astrology help with health-related concerns?",
    ans: (
      <>
        Yes, to a meaningful extent. Each planet and house in your birth chart
        is associated with specific body parts and health tendencies. At{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        , our astrologers can highlight periods when you may be more vulnerable
        to certain health issues and suggest preventive measures or remedies.
        It's not a replacement for medical advice, but it works beautifully as a
        complementary guide — helping you understand your body's natural cycles
        and when to pay extra attention to your wellbeing.
      </>
    ),
  },
  {
    id: 12,
    que: "Is the birth time necessary for accurate readings?",
    ans: (
      <>
        The more precise your birth details, the more accurate your reading will
        be. Birth time is especially important because it determines your
        Ascendant (rising sign) and the positioning of planets across the 12
        houses. At{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        , our astrologers work with whatever details you have — even without an
        exact birth time, they can still provide meaningful insights based on
        your birth date and place. However, for the most personalized and
        precise reading, we always recommend checking your birth certificate or
        hospital records for the exact time.
      </>
    ),
  },
  {
    id: 13,
    que: "Can astrology predictions be changed through remedies?",
    ans: (
      <>
        Astrology doesn't trap you in a fixed fate. While certain planetary
        influences are strong, remedies suggested by {" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com's
          </strong>
        </Link>{" "}
        expert
        astrologers — such as wearing specific gemstones, performing pujas,
        chanting mantras, or making simple lifestyle changes — can help reduce
        negative influences and strengthen positive ones. Think of remedies as
        tools that help you work with the cosmic energies rather than against
        them. Combined with conscious effort and positive action, they can
        genuinely shift the quality of your experiences over time.
      </>
    ),
  },
  {
    id: 14,
    que: "How reliable are astrology apps and platforms?",
    ans: (
      <>
        Reliable astrology platforms like{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        are quite trustworthy, especially for daily horoscopes, birth chart
        generation, and connecting with verified astrologers. At{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        , every astrologer is carefully screened for qualifications and
        experience, and our transparent review and rating system ensures you
        always know who you're consulting. Your privacy is fully protected, and
        all sessions are conducted securely. For deeper, life-changing
        decisions, a personal consultation with one of our experienced
        astrologers is always recommended.
      </>
    ),
  },
  {
    id: 15,
    que: "How much do online astrology consultations cost?",
    ans: (
      <>
        At{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        , we believe that divine guidance should be accessible to everyone.
        That's why we offer free introductory sessions and free birth chart
        generation to help you get started without any pressure. Paid sessions
        are available at very affordable rates, ranging from budget-friendly
        per-minute chat consultations to detailed personalized reports. Compared
        to traditional in-person visits,{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        delivers the same quality of expert guidance at a fraction of the cost —
        conveniently, from wherever you are.
      </>
    ),
  },
  {
    id: 16,
    que: "What benefits can I expect from AstroTring.com's astrology services?",
    ans: (
      <>
        The benefits are both practical and deeply personal.{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        gives you clarity when you're confused, direction when you feel lost,
        and the right timing when you're planning important decisions in love,
        career, health, or finances. Our astrologers help you understand
        yourself better — your strengths, blind spots, and life purpose. Beyond
        prediction,{" "}
        <Link to="https://astrotring.com/">
          <strong className="text-[#0066CC] cursor-pointer">
            AstroTring.com
          </strong>
        </Link>{" "}
        empowers you to make wiser choices, build better relationships, and walk
        through life with greater awareness, confidence, and peace of mind.
      </>
    ),
  },
];

const Faq = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-yellow-100 to-red-20">
      <div className="container">
        <ComponentHead
          className="text-start mb-5"
          heading="Frequently Asked Questions"
          title={
            <>
              Here are the same answers, now branded with{" "}
              <Link to="https://astrotring.com/">
                <strong className="text-[#0066CC] cursor-pointer">
                  AstroTring.com
                </strong>
              </Link>{" "}
              wherever relevant:
            </>
          }
        />
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-8"
        >
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger
                className={"cursor-pointer font-semibold text-lg"}
              >
                {faq.que}
              </AccordionTrigger>
              <AccordionContent>{faq.ans}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
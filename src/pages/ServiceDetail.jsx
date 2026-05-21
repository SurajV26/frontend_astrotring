import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import RelatedDosh from "../components/RelatedDosh";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ServiceDetail = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const currentSlug = slug ?? "mangal-dosh"

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const file = await import(`../data/services/${currentSlug}.md?raw`);
        setContent(file.default);
      } catch (err) {
        setContent("# Service Not Found");
      }
    };

    loadMarkdown();
  }, [currentSlug]);

  return (
    <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {currentSlug.replaceAll("-", " ").toUpperCase()}
          </h1>
          <div className="w-20 md:w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Markdown Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
              <article
                className="
              prose prose-base md:prose-lg max-w-none
              prose-headings:text-gray-900
              prose-h1:text-2xl md:prose-h1:text-3xl
              prose-h2:text-xl md:prose-h2:text-2xl
              prose-h3:text-lg md:prose-h3:text-xl
              prose-p:text-gray-700
              prose-strong:text-yellow-600
              prose-ul:pl-5
            "
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {content}
                </ReactMarkdown>
              </article>
            </div>
          </div>

          {/* RIGHT: Related Sidebar */}
          <div className="lg:col-span-4">
            <RelatedDosh />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetail;

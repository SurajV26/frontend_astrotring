import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, ArrowLeft, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, Link } from "react-router-dom";

const BlogDetails = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  // fetch blogs
  const fetchBlogs = async () => {
    const res = await axios.get("https://astro.astrotring.com/api/blogs");
    console.log("blogdetails", res)

    setBlogs(res.data.data);

    const found = res.data.data.find((b) => b.slug === slug);

    setBlog(found);
  };

  // fetch categories
  const fetchCategories = async () => {
    const res = await axios.get(
      "https://astro.astrotring.com/api/blog_categories",
    );

    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [slug]);

  if (!blog) return <div className="container py-20">Loading...</div>;

  // read time
  const calculateReadTime = (html) => {
    const text = html.replace(/<[^>]+>/g, "");

    const words = text.split(/\s+/).length;

    const minutes = Math.ceil(words / 200);

    return `${minutes} min read`;
  };

  // related blogs
  const relatedBlogs = blogs
    .filter(
      (b) =>
        b.blog_category_id === blog.blog_category_id && b.slug !== blog.slug,
    )
    .slice(0, 3);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <section className="bg-gradient-to-b from-yellow-10 to-yellow-100 py-12">
      <div className="container">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT SIDE BLOG */}

          <div className="lg:col-span-2">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Button>

            <Badge className="mb-4 bg-yellow-100 text-yellow-700">
              {blog.category?.name}
            </Badge>

            <h1 className="text-4xl font-bold mb-4">{blog.name}</h1>

            {/* <div className="flex gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.date)}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {calculateReadTime(blog.description)}
              </div>
            </div> */}

            <div className="w-full max-w-[1026px] mx-auto mb-10 rounded-xl overflow-hidden">
              <img
                src={`https://astro.astrotring.com/storage/blog/${blog.image}`}
                className="w-full h-auto object-contain"
                alt={blog.name}
              />
            </div>

            <article
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: blog.description,
              }}
            />
          </div>

          {/* RIGHT SIDEBAR */}

          <div className="space-y-10 sticky top-24 self-start">
            {/* RELATED BLOGS */}

            <div>
              <h3 className="text-xl font-bold mb-4">Related Blogs</h3>

              <div className="space-y-4">
                {relatedBlogs.map((item) => (
                  <Link
                    key={item.id}
                    to={`/blogs/${item.slug}`}
                    className="flex gap-3 group"
                  >
                    <img
                      src={`https://astro.astrotring.com/storage/blog/${item.image}`}
                      className="w-24 h-20 object-cover rounded-md"
                    />

                    <div>
                      <p className="font-medium group-hover:text-primary line-clamp-2">
                        {item.name}
                      </p>

                      <span className="text-xs text-gray-500">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CATEGORIES */}

            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>

              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/blogs/${cat.slug}`}
                    className="px-3 py-1 bg-yellow-50 rounded-full hover:bg-primary hover:text-white text-sm"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
// BlogDetails.jsx - CORRECTED REDUX VERSION
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/common/Loader";
import {
  getAllBlog,      // ✅ Saare blogs fetch karo
  getBlogCategory,
  clearBlogError,
} from "@/redux/slice/BlogSlice";

const BlogDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { blogs, category, loading, error } = useSelector((state) => state.blog);

  // ✅ Client-side filtering (original code jaisa)
  const blog = blogs?.find((b) => b.slug === slug);

  useEffect(() => {
    dispatch(getAllBlog());      // ✅ Saare blogs fetch karo
    dispatch(getBlogCategory());
    return () => {
      dispatch(clearBlogError());
    };
  }, [dispatch]);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

   // read time
  const calculateReadTime = (html) => {
    const text = html.replace(/<[^>]+>/g, "");

    const words = text.split(/\s+/).length;

    const minutes = Math.ceil(words / 200);

    return `${minutes} min read`;
  };

  // Related blogs (same category)
  const relatedBlogs = blogs?.filter(
    (b) => b.blog_category_id === blog?.blog_category_id && b.slug !== slug
  ) || [];

  if (loading) return <Loader data="Loading blog post..." />;
  if (error) return <div className="container py-20 text-red-500 text-center">{error}</div>;
  if (!blog) return <div className="container py-20 text-center">Blog not found</div>;

  return (
    // ... JSX same as original
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* LEFT SIDE - BLOG CONTENT */}
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

            <div className="flex gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.date)}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {calculateReadTime(blog.description)}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.name}</h1>

            <div className="w-full mb-10 rounded-xl overflow-hidden">
              <img
                src={blog.image_url}
                className="w-full h-auto object-cover"
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
          <div className="space-y-10 sticky top-24 self-start overflow-y-auto h-[calc(100vh-8rem)] scrollbar-hide">
            {/* RELATED BLOGS */}
            {relatedBlogs.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Related Blogs</h3>
                <div className="space-y-4">
                  {relatedBlogs.slice(0, 3).map((item) => (
                    <Link
                      key={item.id}
                      to={`/blogs/${item.slug}`}
                      className="flex gap-3 group"
                    >
                      <img
                        src={item.image_url}
                        className="w-24 h-20 object-cover rounded-md flex-shrink-0"
                        alt={item.name}
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
            )}

            {/* CATEGORIES */}
            <div className=" border p-4 border-gray-300 rounded-xl ">
              <h3 className="text-xl font-bold mb-1">Categories</h3>
              <hr className="mb-2" />

              <div className="flex flex-col gap-4">
                {category.map((cat) => (
                  <span >
                    <Link
                      key={cat.id}
                      to={`/blogs?category=${cat.id}`}
                      className="py-1  rounded-full hover:bg-primary hover:text-white text-sm  border px-4 border-gray-300 hover:border-primary "
                    >
                      {cat.name}
                    </Link></span>
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
// import BlogCard from "@/components/Blog/BlogCard";
// import HeadWithLogo from "@/components/HeadWithLogo";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";

// const Blog = () => {
//   const {t}=useTranslation();
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("All");
//   const [search, setSearch] = useState("");

//   const fetchCategories = async () => {
//     const res = await axios.get(
//       "https://astro.astrotring.com/api/blog_categories",
//     );

//     setCategories([{ id: "All", name: "All" }, ...res.data.data]);
//   };

//   const fetchBlogs = async (categoryId = null) => {
//     let url = "https://astro.astrotring.com/api/blogs";

//     if (categoryId && categoryId !== "All") {
//       url += `?blog_category_id=${categoryId}`;
//     }

//     const res = await axios.get(url);

//     setBlogs(res.data.data);
//     setFilteredBlogs(res.data.data);
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchBlogs();
//   }, []);

//   useEffect(() => {
//     let filtered = blogs;

//     if (search.trim()) {
//       const query = search.toLowerCase();

//       filtered = filtered.filter((blog) =>
//         blog.name.toLowerCase().includes(query),
//       );
//     }

//     setFilteredBlogs(filtered);
//   }, [search, blogs]);

//   return (
//     <section className="py-10 bg-gradient-to-b from-yellow-10 to-yellow-100">
//       <div className="container">
//         {/* HERO HEADER */}
//         <div className="text-center mb-12">
//           <HeadWithLogo className="mb-4" title={t("astrologyBlogs")}  />
//         </div>
//         {/* SEARCH BAR */}
//         <div className="max-w-xl mx-auto mb-10">
//           <Input
//             placeholder="Search blog articles..."
//             className="h-12 rounded-full shadow-sm border-gray-300"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         {/* MOBILE CATEGORY DROPDOWN */}{" "}
//         <div className="lg:hidden mb-8">
//           {" "}
//           <select
//             value={category}
//             onChange={(e) => {
//               setCategory(e.target.value);
//               fetchBlogs(e.target.value);
//             }}
//             className="w-full h-11 border rounded-lg px-3 bg-white"
//           >
//             {" "}
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {" "}
//                 {cat.name}{" "}
//               </option>
//             ))}{" "}
//           </select>{" "}
//         </div>
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* CATEGORY SIDEBAR */}

//           <div className="lg:col-span-1 hidden lg:block">
//             <div className="bg-white shadow-sm rounded-xl p-5 sticky top-28">
//               <h3 className="font-semibold mb-4 text-lg">     {t("categories")}</h3>

//               <ScrollArea className="h-[420px] pr-3">
//                 <ul className="space-y-2">
//                   {categories.map((cat) => (
//                     <li
//                       key={cat.id}
//                       onClick={() => {
//                         setCategory(cat.id);
//                         fetchBlogs(cat.id);
//                       }}
//                       className={`cursor-pointer px-3 py-2 rounded-md text-sm transition
//                       ${
//                         category === cat.id
//                           ? "bg-primary text-white"
//                           : "hover:bg-gray-100"
//                       }
//                       `}
//                     >
//                       {cat.name}
//                     </li>
//                   ))}
//                 </ul>
//               </ScrollArea>
//             </div>
//           </div>

//           {/* BLOG GRID */}

//           <div className="lg:col-span-3">
//             {filteredBlogs.length > 0 ? (
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredBlogs.map((blog) => (
//                   <BlogCard
//                     key={blog.slug}
//                     blog={{
//                       title: blog.name,
//                       slug: blog.slug,
//                       date: blog.date,
//                       img: `https://astro.astrotring.com/storage/blog/${blog.image}`,
//                       category: blog.category?.name,
//                     }}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-20 text-yellow-10">
//           {t("noBlogs")}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Blog;


import BlogCard from "@/components/Blog/BlogCard";
import HeadWithLogo from "@/components/HeadWithLogo";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  getAllBlog,
  getBlogCategory,
  clearBlogError,
} from "@/redux/slice/BlogSlice";
import Loader from "@/components/common/Loader";
import { useSearchParams } from "react-router-dom";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { blogs, category, loading, error } = useSelector((state) => state.blog);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || "All");
  const [search, setSearch] = useState("");
  const isFirstRender = useRef(true);

  // Prepare categories with "All" option and translation
  const translatedCategories = [
    { id: "All", name: t("all") },
    ...(category || []).map((cat) => ({
      ...cat,
      name: t(cat.name),
    })),
  ];

  // Handle category from URL
  useEffect(() => {
    if (categoryFromUrl && categoryFromUrl !== "All") {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // ✅ Fetch categories on mount and language change only
  useEffect(() => {
    dispatch(getBlogCategory());
  }, [dispatch, i18n.language]);

  // ✅ Fetch blogs when selectedCategory changes
  useEffect(() => {
    // Skip on first render if we already have blogs from initial load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      // Still fetch, but don't double-fetch
    }
    if (selectedCategory === "All") {
      dispatch(getAllBlog());
    } else {
      dispatch(getAllBlog(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  // ✅ Filter blogs on search (client-side)
  useEffect(() => {
    let filtered = blogs || [];
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter((blog) =>
        blog.name?.toLowerCase().includes(query)
      );
    }
    setFilteredBlogs(filtered);
  }, [search, blogs]);

  // Clear error on unmount
  useEffect(() => {
    return () => {
      dispatch(clearBlogError());
    };
  }, [dispatch]);

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <section className="py-10 bg-gradient-to-b from-yellow-10 to-yellow-100">
      <div className="container">
        {/* HERO HEADER */}
        <div className="text-center mb-12">
          <HeadWithLogo className="mb-4" title={t("astrologyBlogs")} />
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto mb-10">
          <Input
            placeholder={t("searchBlogs")}
            className="h-12 rounded-full shadow-sm border-gray-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* MOBILE CATEGORY DROPDOWN */}
        <div className="lg:hidden mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-11 border rounded-lg px-3 bg-white"
          >
            {translatedCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* CATEGORY SIDEBAR */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white shadow-sm rounded-xl p-5 sticky top-28">
              <h3 className="font-semibold mb-4 text-lg">{t("categories")}</h3>
              <ScrollArea className="h-[420px] pr-3">
                <ul className="space-y-2">
                  {translatedCategories.map((cat) => (
                    <li
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`cursor-pointer px-3 py-2 rounded-md text-sm transition
                        ${
                          selectedCategory === cat.id
                            ? "bg-primary text-white"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      {cat.name}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </div>

          {/* BLOG GRID */}
          <div className="lg:col-span-3">
            {loading ? (
              <Loader data={t("loading")} />
            ) : filteredBlogs.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.slug}
                    blog={{
                      title: blog.name,
                      slug: blog.slug,
                      date: blog.date,
                      img: blog.image_url, // ✅ FIXED
                      category: blog.category?.name,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                {t("noBlogs")}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
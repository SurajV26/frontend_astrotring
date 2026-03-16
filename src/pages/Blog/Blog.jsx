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
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Blog = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  // Fetch categories and translate them
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://astro.astrotring.com/api/blog_categories"
      );

      const translatedCategories = res.data.data.map((cat) => ({
        ...cat,
        name: t(cat.name) // translate API category name
      }));

      setCategories([
        { id: "All", name: t("all") }, // translate "All"
        ...translatedCategories
      ]);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  // Fetch blogs and translate their category names
  const fetchBlogs = async (categoryId = null) => {
    try {
      let url = "https://astro.astrotring.com/api/blogs";
      if (categoryId && categoryId !== "All") {
        url += `?blog_category_id=${categoryId}`;
      }

      const res = await axios.get(url);

      const translatedBlogs = res.data.data.map((blog) => ({
        ...blog,
        name: t(blog.name), // translate blog title
        category: {
          ...blog.category,
          name: t(blog.category?.name) // translate category name
        }
      }));

      setBlogs(translatedBlogs);
      setFilteredBlogs(translatedBlogs);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  // Load categories and blogs on initial render and on language change
  useEffect(() => {
    fetchCategories();
    fetchBlogs();
  }, [i18n.language]);

  // Filter blogs on search
  useEffect(() => {
    let filtered = blogs;
    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter((blog) =>
        blog.name.toLowerCase().includes(query)
      );
    }
    setFilteredBlogs(filtered);
  }, [search, blogs]);

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
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              fetchBlogs(e.target.value);
            }}
            className="w-full h-11 border rounded-lg px-3 bg-white"
          >
            {categories.map((cat) => (
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
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id);
                        fetchBlogs(cat.id);
                      }}
                      className={`cursor-pointer px-3 py-2 rounded-md text-sm transition
                        ${
                          category === cat.id
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
            {filteredBlogs.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard
                    key={blog.slug}
                    blog={{
                      title: blog.name,
                      slug: blog.slug,
                      date: blog.date,
                      img: `https://astro.astrotring.com/storage/blog/${blog.image}`,
                      category: blog.category?.name,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-yellow-10">
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

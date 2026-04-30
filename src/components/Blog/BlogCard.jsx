import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link to={`/blogs/${blog.slug}`}>
      <Card className="overflow-hidden hover:shadow-xl transition">
        <div className="relative h-[200px]">
          <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-full "
          />

          <Badge className="absolute top-3 left-3 bg-white text-slate-800">
            {blog.category}
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="text-md line-clamp-1">{blog.title}</CardTitle>

          <CardDescription className="flex items-center gap-2 text-xs">
            <Calendar className="w-4 h-4" />

            {formatDate(blog.date)}
          </CardDescription>
        </CardHeader>

        <CardFooter className="pb-4">
          <Button className="w-full">Read More</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

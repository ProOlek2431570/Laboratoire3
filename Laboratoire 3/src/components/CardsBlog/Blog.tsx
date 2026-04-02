import { useEffect, useState } from "react";
import BlogList from "./BlogList";
import BlogDetails from "./BlogDetails";

export default function Blog() {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id"));
  }, []);

  return (
    <div>
      {!id ? (
        <BlogList />
      ) : (
        <BlogDetails id={id} />
      )}
    </div>
  );
}
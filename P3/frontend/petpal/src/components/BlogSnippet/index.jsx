import React, { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import remarkGfm from "remark-gfm";
import Post from "../BlogPost";

const BlogSnippet = ({ post }) => {
  const date = new Date(post.created_at);
  const month = date.toLocaleString("default", { month: "long" });
  const ref = useRef();
  const maxHeight = 700;
  useEffect(() => {
    ref.current.style.webkitMaskImage = `linear-gradient(180deg, #000 ${
      ref.current.clientHeight === maxHeight ? "80%" : "100%"
    }, transparent)`;
    ref.current.style.maxHeight = `${maxHeight}px`;
  });
  return (
    <Link to={`/blog/${post.id}`}>
      <div ref={ref} className={`from-current overflow-hidden`}>
        <Post {...post} />
        {/* <h1 className=" from-current text-2xl font-bold">{post.title}</h1>
        <h1 className="text-sm italic">{`${month} ${date.getDate()}, ${date.getFullYear()}`}</h1>
        <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown> */}
      </div>
    </Link>
  );
};

export default BlogSnippet;

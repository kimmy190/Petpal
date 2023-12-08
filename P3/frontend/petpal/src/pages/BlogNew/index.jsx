import BlogEdit from "../../components/BlogEdit";

const BlogNew = () => {
    return (
        <div className="flex justify-center items-center h-screen">
          <div className="w-3/4 max-w-screen-lg">
            <h1 className="text-3xl md:text-5xl mb-8 blog/">Create a new blog post </h1>
            <BlogEdit />
          </div>
        </div>
    );
};

export default BlogNew;
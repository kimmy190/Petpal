import Markdown from '../../components/Markdown';
import { Link } from "react-router-dom";

const BlogPost = ({ image, title, author, content, created_at }) => {
    const date = created_at ? new Date(created_at): new Date();
    const month = date.toLocaleString("default", { month: "long" });
    return (
        <div className="max-w-4xl mx-auto">
          <img src={image ? image : "https://via.placeholder.com/800x400"} alt="Hero" className="w-full h-64 object-cover object-center" />

          <div className="">
            <h1 className="from-current text-5xl font-bold my-8">{title}</h1>

            <Link to={`/shelter/${author.id}`}>
              <div className="flex items-center ml-6 mb-8">
                <img src={author.logo_image} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-bold">{author.organization_name}</p>
                  <h1 className="text-sm italic">{`${month} ${date.getDate()}, ${date.getFullYear()}`}</h1>
                </div>
              </div>
              </Link>
              <Markdown content={content} />
          </div>
        </div>
    );
}
export default BlogPost;
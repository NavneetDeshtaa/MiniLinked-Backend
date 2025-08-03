// src/components/Post.jsx
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <div className="text-sm text-gray-500">
        <Link to={`/profile/${post.author._id}`} className="font-medium text-blue-600">
          {post.author.name}
        </Link>{" "}
        • {new Date(post.createdAt).toLocaleString()}
      </div>
      <p className="mt-2 text-gray-800">{post.content}</p>
    </div>
  );
}

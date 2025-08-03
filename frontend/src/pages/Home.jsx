// src/pages/Home.jsx
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Sidebar - Profile Preview + Tools */}
        <div className="hidden md:flex md:flex-col md:col-span-3 space-y-6">
          {/* Profile Preview */}
          <div className="bg-white rounded-lg shadow p-5 text-center">
            {currentUser ? (
              <>
                <img
                  src={"/default-avatar.png"}
                  alt="Profile"
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {currentUser.name}
                </h2>
                <p className="text-lg text-gray-500">
                  {currentUser.title || "Developer"}
                </p>
                <button
                  onClick={() => navigate(`/profile/${currentUser._id}`)}
                  className="mt-4 w-full text-md bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  View Profile
                </button>
              </>
            ) : (
              <>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Guest"
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  Guest User
                </h2>
                <p className="text-lg text-gray-500">Login to access profile</p>
                <button
                  onClick={() => navigate("/login")}
                  className="mt-4 w-full text-md bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {/* Extra Panel */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-2xl font-medium text-gray-800 mb-2">
              My Tools
            </h3>
            <ul className="text-lg text-gray-600 space-y-1">
              <li>• My Posts</li>
              <li>• My Drafts</li>
              <li>• Saved Items</li>
            </ul>
          </div>
        </div>

        {/* Main Feed */}
        <div className="col-span-12 md:col-span-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-5xl font-bold text-blue-700">
              Welcome to Your Feed
            </h1>
            <p className="text-gray-600 text-lg mt-2">
              Share your ideas and connect with peers
            </p>
          </div>

          {/* Create Post */}
          <div className="bg-white rounded-lg shadow p-5 mb-6">
            {currentUser ? (
              <PostForm onPostCreated={handleNewPost} />
            ) : (
              <div className="text-center text-gray-600 text-lg">
                <p className="mb-4">
                  Please{" "}
                  <span
                    className="text-blue-600 font-semibold cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    login
                  </span>{" "}
                  to create a post.
                </p>
              </div>
            )}
          </div>

          {/* Posts */}
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="mb-6">
                <Post post={post} />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <p>No posts yet. Be the first to post something!</p>
            </div>
          )}
        </div>

        {/* Right Sidebar - Suggestions & Extras */}
        <div className="hidden md:flex md:flex-col md:col-span-3 space-y-6">
          {/* Suggestions */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Suggestions to Follow
            </h3>
            <ul className="space-y-3 text-lg">
              {["Riya Patel", "Aman Sharma", "Priya Desai"].map((name, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span className="text-gray-700">{name}</span>
                  <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Follow
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Events / Community */}
          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Upcoming Events
            </h3>
            <ul className="text-lg text-gray-600 space-y-2">
              <li>🚀 Hackathon Week – Aug 12</li>
              <li>💬 DevTalks AMA – Aug 17</li>
              <li>📢 Project Showcase – Aug 21</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

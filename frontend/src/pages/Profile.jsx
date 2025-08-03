import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/posts/user/${id}`
        );
        setUser(userRes.data);

        const postRes = await axios.get(
         `${import.meta.env.VITE_BACKEND_URL}/api/posts/user/${id}`
        );
        setPosts(postRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [id]);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (!user)
    return (
      <div className="text-center mt-20 text-gray-500">Loading Profile...</div>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Section - Profile & Posts */}
        <div className="md:col-span-9 space-y-8">
          {/* Banner + Avatar */}
          {/* Cover Photo + Profile Picture */}
          <div className="relative h-48 rounded-t-lg shadow bg-gray-200">
            {/* Cover Photo */}
            <img
              src={
                user.coverPhoto
                  ? `http://localhost:5000${user.coverPhoto}`
                  : "/cover.png"
              }
              alt="Cover"
              className="w-full h-full object-cover rounded-t-lg"
            />

            {/* Profile Picture */}
            <div className="absolute left-8 bottom-[-64px]">
              <img
                src={
                  user.profilePic
                    ? `http://localhost:5000${user.profilePic}`
                    : "/default-avatar.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-gray-100"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="bg-white shadow-md rounded-lg p-6 pt-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600 text-2xl">
                  {user.title || "Software Developer"}
                </p>
                <p className="text-gray-500 text-lg mt-1">
                  {user.location || "Shimla, Himachal Pradesh"}
                </p>
              </div>
              {currentUser?._id === id ? (
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                    Message
                  </button>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                    Follow
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <p className="text-xl font-semibold">{posts.length}</p>
                <p className="text-gray-500 text-sm">Posts</p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  {user.followers?.length || 0}
                </p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  {user.following?.length || 0}
                </p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>

            {/* About Section */}
            <div className="mt-6 space-y-4">
              <div>
                <h4 className="text-xl font-semibold mb-1">About</h4>
                <p className="text-gray-700">
                  {user.bio || "No bio provided yet."}
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Skills</h4>
                <p className="text-gray-700">
                  JavaScript, React, Node.js, MongoDB, TailwindCSS, Git, REST
                  APIs
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Education</h4>
                <p className="text-gray-700">
                  B.Tech in ECE - NIT Hamirpur (2022–2026)
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-1">Contact</h4>
                <p className="text-gray-700">
                  Email: navneetdeshtaa@gmail.com{" "}
                </p>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Your Posts
            </h3>
            {posts.length > 0 ? (
              posts.map((post) => <Post key={post._id} post={post} />)
            ) : (
              <p className="text-gray-500">No posts yet.</p>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="md:col-span-3 space-y-6">
          {/* Static About Box */}
          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="text-xl font-semibold mb-2 text-gray-800">
              Quick Info
            </h4>
            <ul className="text-lg text-gray-600 list-disc pl-4 space-y-1">
              <li>Open to new opportunities</li>
              <li>Learning system design</li>
              <li>Building MiniLinkedIn 🔥</li>
            </ul>
          </div>

          {/* Suggestions Box */}
          <div className="bg-white shadow rounded-lg p-4">
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              Suggestions
            </h4>
            <ul className="space-y-2 text-lg text-gray-600">
              <li className="flex items-center justify-between">
                <span>Ayush Raj</span>
                <button className="text-blue-600 hover:underline">
                  Follow
                </button>
              </li>
              <li className="flex items-center justify-between">
                <span>Sakshi Mehta</span>
                <button className="text-blue-600 hover:underline">
                  Follow
                </button>
              </li>
              <li className="flex items-center justify-between">
                <span>Shivam Chauhan</span>
                <button className="text-blue-600 hover:underline">
                  Follow
                </button>
              </li>
            </ul>
          </div>

          {/* Create Post (moved below boxes) */}
          {currentUser?._id === id && (
            <div className="bg-white shadow rounded-lg p-4">
              <PostForm onPostCreated={handleNewPost} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

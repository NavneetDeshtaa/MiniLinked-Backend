// src/components/PostForm.jsx
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function PostForm({ onPostCreated }) {
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
        content,
        author: user._id,
      });
      setContent("");
      onPostCreated(res.data);
    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded p-2 resize-none mb-2"
        rows={3}
        required
      />
      <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
        Post
      </button>
    </form>
  );
}

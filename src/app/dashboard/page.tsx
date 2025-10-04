"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "@/app/components/FileUpload";
import { useSession, signOut } from 'next-auth/react'

interface Video {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const isLoggedIn = status === "authenticated"

  const [videos, setVideos] = useState<Video[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch videos from API
  const fetchVideos = async () => {
    const res = await fetch("/api/video");
    const data = await res.json();
    setVideos(data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Submit video metadata to API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl || !thumbnailUrl) {
      alert("Please upload both video and thumbnail.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, videoUrl, thumbnailUrl }),
      });
      if (!res.ok) throw new Error("Upload failed");

      // Refresh list and reset form
      await fetchVideos();
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setThumbnailUrl("");
      setVideoProgress(0);
      setThumbnailProgress(0);
    } catch (err) {
      console.error(err);
      alert("Failed to upload video metadata.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete video
  const handleDeleteVideo = async (videoId: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    
    try {
      const res = await fetch(`/api/video/${videoId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      
      // Close modal and refresh list
      setSelectedVideo(null);
      await fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Failed to delete video.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-700/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Navbar */}
      <nav className="relative z-50 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-10 h-10 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-md"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                ReelCraft
              </h1>
            </div>

            {/* User Menu */}
            <div className="relative flex gap-5">
            <button
                                onClick={() => router.push('/public-videos')}
                                className="text-zinc-300 hover:text-white transition-colors font-medium"
                            >
                                Explore
                            </button>
              {isLoggedIn ? (
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl transition-all border border-zinc-700"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {session?.user?.name?.[0].toUpperCase() || session?.user?.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-zinc-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push('/login')}
                    className="text-zinc-300 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => router.push('/register')}
                    className="bg-white hover:bg-zinc-100 text-zinc-900 font-semibold px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Dropdown Menu */}
              {showUserMenu && isLoggedIn && (
                <div className="absolute right-0 mt-16 w-48 bg-zinc-800 backdrop-blur-xl rounded-xl border border-zinc-700 shadow-2xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-zinc-700">
                    <p className="text-sm text-zinc-400">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">{session?.user?.email}</p>
                  </div>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                  >
                    Profile Settings
                  </a>
                  <a
                    href="/upload"
                    className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                  >
                    Upload Video
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 transition-colors border-t border-zinc-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-2">
            Upload Video
          </h1>
          <p className="text-zinc-400 text-lg">Share your content with the world</p>
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 p-8 mb-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/10 to-zinc-700/10 rounded-2xl blur-xl"></div>

          <div className="space-y-6 relative z-10">
            {/* Title Input */}
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-zinc-200">
                Video Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all duration-300"
                required
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-zinc-200">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Describe your video"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-200">
                Upload Video
              </label>
              <FileUpload
                fileType="video"
                onSuccess={(res) => setVideoUrl((res as { url: string }).url)}
                onProgress={(p) => setVideoProgress(p)}
              />
              {videoProgress > 0 && videoProgress < 100 && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-zinc-400">Uploading video...</span>
                    <span className="text-xs font-bold text-white">{videoProgress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                    <div
                      className="h-full bg-gradient-to-r from-zinc-400 to-zinc-500 transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {videoUrl && (
                <div className="flex items-center space-x-2 text-sm text-green-400 mt-2">
                  <span>✅</span>
                  <span>Video uploaded successfully</span>
                </div>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-200">
                Upload Thumbnail
              </label>
              <FileUpload
                fileType="image"
                onSuccess={(res) => setThumbnailUrl((res as { url: string }).url)}
                onProgress={(p) => setThumbnailProgress(p)}
              />
              {thumbnailProgress > 0 && thumbnailProgress < 100 && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-zinc-400">Uploading thumbnail...</span>
                    <span className="text-xs font-bold text-white">{thumbnailProgress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                    <div
                      className="h-full bg-gradient-to-r from-zinc-400 to-zinc-500 transition-all duration-300"
                      style={{ width: `${thumbnailProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {thumbnailUrl && (
                <div className="flex items-center space-x-2 text-sm text-green-400 mt-2">
                  <span>✅</span>
                  <span>Thumbnail uploaded successfully</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || !videoUrl || !thumbnailUrl}
                className="w-full bg-white hover:bg-zinc-100 text-zinc-900 font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl"
              >
                {loading ? "Uploading..." : "Submit Video"}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}
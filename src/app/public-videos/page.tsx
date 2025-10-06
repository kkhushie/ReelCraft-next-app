"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from 'next-auth/react';

interface Video {
    _id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
}

export default function PublicVideosPage() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [filter, setFilter] = useState('all');
    const router = useRouter();
    const { data: session, status } = useSession();
    const isLoggedIn = status === "authenticated";

    const fetchVideos = async () => {
        try {
            const res = await fetch("/api/video");
            const data = await res.json();
            setVideos(data);
        } catch (err) {
            console.error("Failed to fetch videos:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };
    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    try {
        // Use currentTarget to reliably access the button
        console.log(e)
        e.target.innerText = "Copied!";
        await navigator.clipboard.writeText(url);
        setTimeout(() => {
            e.target.innerText = "Copy";
        }, 5000);
    } catch (err) {
        console.error("Copy failed:", err);
    }
};

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-700/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <div className="relative z-10 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mb-4"></div>
                        <p className="text-white text-xl">Loading videos...</p>
                    </div>
                </div>
            </div>
        );
    }

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

                        {/* Search Bar */}
                        <div className="hidden md:block flex-1 max-w-md mx-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search videos..."
                                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                                />
                                <div className="absolute right-3 top-2.5">
                                    <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="relative flex gap-5" >
                            
                        <button
                                onClick={() => router.push('/')}
                                className="text-zinc-300 hover:text-white transition-colors font-medium"
                            >
                                Home
                            </button>
                            {isLoggedIn ? (
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-3 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl transition-all border border-zinc-700"
                                >
                                    <div className=" w-8 h-8 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-full flex items-center justify-center">
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
                                        href="/dashboard"
                                        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                                    >
                                        My Videos
                                    </a>
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                                    >
                                        Profile Settings
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
                    <p
                        onClick={() => router.back()}
                        className="mb-3 text-zinc-100 cursor-pointer hover:underline"
                    >
                        Back
                    </p>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-3">
                        Discover Videos
                    </h1>
                    <p className="text-zinc-400 text-lg">Explore content from creators around the world</p>
                </div>

                {/* Filter Section */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex space-x-2">
                        {['all', 'trending', 'recent', 'popular'].map((filterType) => (
                            <button
                                key={filterType}
                                onClick={() => setFilter(filterType)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${filter === filterType
                                    ? 'bg-white text-zinc-900'
                                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                    }`}
                            >
                                {filterType}
                            </button>
                        ))}
                    </div>

                    <div className="text-sm text-zinc-400">
                        {videos.length} {videos.length === 1 ? 'video' : 'videos'}
                    </div>
                </div>

                {/* Videos Grid */}
                {videos.length === 0 ? (
                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-800 p-12 text-center">
                        <div className="text-6xl mb-4">📹</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No videos yet</h3>
                        <p className="text-zinc-400 mb-6">Be the first to share your content!</p>
                        {isLoggedIn ? (
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="bg-white hover:bg-zinc-100 text-zinc-900 font-semibold px-6 py-3 rounded-xl transition-all transform hover:scale-105"
                            >
                                Upload Video
                            </button>
                        ) : (
                            <button
                                onClick={() => router.push('/register')}
                                className="bg-white hover:bg-zinc-100 text-zinc-900 font-semibold px-6 py-3 rounded-xl transition-all transform hover:scale-105"
                            >
                                Get Started
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {videos && videos.map((video) => (
                            <div
                                key={video._id}
                                className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300 group cursor-pointer"

                            >
                                <div className="relative h-80 overflow-hidden" onClick={() => setSelectedVideo(video)}>
                                    <img
                                        src={video.thumbnailUrl}
                                        alt={video.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-zinc-900 border-b-8 border-b-transparent ml-1"></div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-3 right-3 bg-zinc-900/90 text-white px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
                                        VIDEO
                                    </div>
                                </div>

                                <div className="p-4 space-y-2">
                                    <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-zinc-200 transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm line-clamp-2">
                                        {video.description}
                                    </p>

                                    <div className="flex items-center space-x-4 pt-2 text-xs text-zinc-500">
                                        {/* Shareable Link */}
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                readOnly
                                                value={video.videoUrl}
                                                className="flex-1 px-3 py-2 bg-zinc-800 text-white text-xs rounded border border-zinc-700 focus:outline-none"
                                            />
                                            <button
                                                onClick={(e) => handleCopy(e, video.videoUrl)}
                                                className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-xs rounded transition"
                                            >
                                                Copy
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Video Player Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 bg-zinc-950/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 max-w-5xl w-full overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-start p-6 border-b border-zinc-800">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    {selectedVideo.title}
                                </h2>
                                <p className="text-zinc-400 text-sm">
                                    {selectedVideo.description}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="ml-4 w-10 h-10 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center transition-colors"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Video Player */}
                        <div className="relative bg-black aspect-video">
                            <video
                                src={selectedVideo.videoUrl}
                                controls
                                autoPlay
                                className="w-full h-full"
                                preload="auto"
                            />
                        </div>

                        {/* Modal Footer with Actions */}
                        <div className="p-6 border-t border-zinc-800 flex flex-wrap gap-3">
                            <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <span>👍</span>
                                <span className="text-sm font-medium">Like</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <span>💾</span>
                                <span className="text-sm font-medium">Save</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition-colors">
                                <span>📤</span>
                                <span className="text-sm font-medium">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
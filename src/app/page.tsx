"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {IVideo} from "@/app/models/Video"

const HomePage = () => {
    const { data: session, status } = useSession()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [filter, setFilter] = useState('popular')
    const [showUserMenu, setShowUserMenu] = useState(false)
    const router = useRouter()
    const [trendingMedia, setTrendingMedia] = useState<IVideo[]>([]);
    const [loadingTrending, setLoadingTrending] = useState(true);
    const [selectedVideo, setSelectedVideo] = useState<IVideo|null>(null);

    const isLoggedIn = status === "authenticated"

    const carouselItems = [
        { type: 'image', src: 'https://tmt-assets-ui.s3.eu-north-1.amazonaws.com/assets/ai/landingpage/showcase/showcase1.png', title: 'AI-Generated Thumbnail' },
        { type: 'image', src: 'https://ideogram.ai/assets/image/lossless/response/Hgt4AmQwSl6I-YTE9NPo4A', title: 'Adaptive Streaming Video' },
        { type: 'image', src: 'https://ideogram.ai/assets/progressive-image/balanced/response/8NMy6b5zSzqXiBThzj3yWQ', title: 'Optimized Upload' },
    ]

    useEffect(() => {
        const fetchMedia = async () => {
            setLoadingTrending(true);
            try {
                const res = await fetch('/api/video');
                const data: IVideo[] = await res.json();

                let filteredData = data;

                if (filter === 'latest') {
                    filteredData = data.sort((a, b) => 
                        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
                    );
                } else if (filter === 'videos') {
                    filteredData = data.filter((item) => item.videoUrl);
                }

                setTrendingMedia(filteredData.slice(0, 3));
            } catch (err) {
                console.error('Failed to fetch videos:', err);
            } finally {
                setLoadingTrending(false);
            }
        };

        fetchMedia();
    }, [filter]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [carouselItems.length])

    const handleGetStarted = () => {
        if (isLoggedIn) {
            router.push('/upload')
        } else {
            router.push('/register')
        }
    }

    const handleLogout = async () => {
        try {
            await signOut({ redirect: false })
            router.push('/login')
        } catch (err) {
            console.error("Logout failed:", err)
        }
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

            {/* Header */}
            <header className="relative z-50 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => router.push('/')}>
                            <div className="w-10 h-10 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-xl flex items-center justify-center">
                                <div className="w-6 h-6 bg-white rounded-md"></div>
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                                ReelCraft
                            </h1>
                        </div>

                        {/* Search */}
                        <div className="hidden md:block flex-1 max-w-md mx-8">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search media..."
                                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                                />
                                <div className="absolute right-3 top-2.5">
                                    <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-6">
                            <button
                                onClick={() => router.push('/public-videos')}
                                className="text-zinc-300 hover:text-white transition-colors font-medium"
                            >
                                Explore
                            </button>
                            {isLoggedIn ? (
                                <div className="relative">
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

                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-48 bg-zinc-800 backdrop-blur-xl rounded-xl border border-zinc-700 shadow-2xl overflow-hidden">
                                            <div className="px-4 py-3 border-b border-zinc-700">
                                                <p className="text-sm text-zinc-400">Signed in as</p>
                                                <p className="text-sm font-semibold text-white truncate">{session?.user?.email}</p>
                                            </div>
                                            <a href="/dashboard" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                                                Dashboard
                                            </a>
                                            <a href="/profile" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                                                Profile
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
                            ) : (
                                <>
                                    <button
                                        onClick={() => router.push('/login')}
                                        className="text-zinc-300 hover:text-white transition-colors font-medium"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => router.push('/register')}
                                        className="bg-white hover:bg-zinc-100 text-zinc-900 font-semibold px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <div className="space-y-6">
                                    <h1 className="text-5xl lg:text-6xl font-bold">
                                        <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                                            Share Smarter.
                                        </span>
                                        <br />
                                        <span className="bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                            Create Faster.
                                        </span>
                                        <br />
                                        <span className="bg-gradient-to-r from-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                                            Powered by AI.
                                        </span>
                                    </h1>
                                    <p className="text-xl text-zinc-400 leading-relaxed">
                                        Transform your media sharing experience with AI-powered thumbnails,
                                        adaptive streaming, and lightning-fast uploads.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleGetStarted}
                                        className="bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-white/25"
                                    >
                                        {isLoggedIn ? 'Upload Now' : 'Get Started'}
                                    </button>
                                    <button className="border-2 border-zinc-700 hover:border-zinc-500 text-white font-semibold px-8 py-4 rounded-xl transition-all">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            {/* Carousel */}
                            <div className="relative">
                                <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800">
                                    <div className="relative h-80 overflow-hidden rounded-xl">
                                        {carouselItems.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSlide ? "translate-x-0" : "translate-x-full"}`}
                                            >
                                                <div className="w-full h-full rounded-xl flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={item.src}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover rounded-xl"
                                                    />
                                                </div>
                                                <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                                                    <p className="text-white font-semibold text-sm">{item.title}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Carousel indicators */}
                                    <div className="flex justify-center space-x-2 mt-4">
                                        {carouselItems.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-zinc-600"}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* NEW: Instant Video Links Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-8 border border-zinc-800">
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-zinc-700 to-white-600 rounded-xl flex items-center justify-center">
                                                <span className="text-white text-xl">⚡</span>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white">Instant Shareable Links</h3>
                                                <p className="text-zinc-400">Get your video online in seconds</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-semibold">Upload & Get Link Instantly</h4>
                                                    <p className="text-zinc-400 text-sm">No waiting, no processing delays</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-semibold">Share Anywhere</h4>
                                                    <p className="text-zinc-400 text-sm">Copy the link and share on social media, emails, or messages</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start space-x-3">
                                                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-1">
                                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-semibold">No Downloads Required</h4>
                                                    <p className="text-zinc-400 text-sm">Viewers can watch directly in their browser</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                onClick={handleGetStarted}
                                                className=" bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105"
                                            >
                                                {isLoggedIn ? 'Upload & Get Link Now' : 'Get Started - It\'s Free'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-1 lg:order-2 text-center lg:text-left">
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-6">
                                    Get Instant Video Links
                                </h2>
                                <p className="text-xl text-zinc-400 mb-8 leading-relaxed">
                                    Upload your video and get a shareable link instantly. Perfect for quick sharing,
                                    social media posts, or sending to clients and friends.
                                </p>

                                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-xl p-4 border border-zinc-800">
                                        <div className="text-3xl mb-2">🚀</div>
                                        <h4 className="text-white font-semibold text-sm">Instant</h4>
                                        <p className="text-zinc-400 text-xs">Links ready in seconds</p>
                                    </div>
                                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-xl p-4 border border-zinc-800">
                                        <div className="text-3xl mb-2">🔗</div>
                                        <h4 className="text-white font-semibold text-sm">Shareable</h4>
                                        <p className="text-zinc-400 text-xs">Works everywhere</p>
                                    </div>
                                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-xl p-4 border border-zinc-800">
                                        <div className="text-3xl mb-2">📱</div>
                                        <h4 className="text-white font-semibold text-sm">Mobile Ready</h4>
                                        <p className="text-zinc-400 text-xs">Optimized for all devices</p>
                                    </div>
                                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-xl p-4 border border-zinc-800">
                                        <div className="text-3xl mb-2">🛡️</div>
                                        <h4 className="text-white font-semibold text-sm">Secure</h4>
                                        <p className="text-zinc-400 text-xs">Your content protected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Highlights */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-4">
                                Why Choose ReelCraft?
                            </h2>
                            <p className="text-xl text-zinc-400">Powerful features designed for modern content creators</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
                            {[
                                { icon: '🎨', title: 'AI Thumbnail Generation', desc: 'Auto-generate stunning thumbnails' },
                                { icon: '📡', title: 'Adaptive Streaming', desc: 'Optimized playback for any device' },
                                { icon: '🔐', title: 'Secure Authentication', desc: 'Your content, protected' },
                                { icon: '⚡', title: 'Fast Uploads', desc: 'Lightning-speed file processing' },
                                { icon: '📱', title: 'Mobile Optimized', desc: 'Perfect on any screen size' },
                            ].map((feature, index) => (
                                <div key={index} className="group">
                                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:transform hover:scale-105">
                                        <div className="text-4xl mb-4">{feature.icon}</div>
                                        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                        <p className="text-zinc-400 text-sm">{feature.desc}</p>
                                        <button className="mt-4 text-white hover:text-zinc-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            Learn More →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Media Showcase */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                                Trending Media
                            </h2>

                            <div className="flex space-x-2">
                                {['popular', 'latest', 'videos'].map((filterType) => (
                                    <button
                                        key={filterType}
                                        onClick={() => setFilter(filterType)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${filter === filterType ? 'bg-white text-zinc-900' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                                    >
                                        {filterType}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loadingTrending ? (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                            </div>
                        ) : trendingMedia.length === 0 ? (
                            <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-zinc-800 p-12 text-center">
                                <div className="text-6xl mb-4">📹</div>
                                <h3 className="text-xl font-semibold text-white mb-2">No videos yet</h3>
                                <p className="text-zinc-400">Be the first to upload!</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {trendingMedia.map((media, index) => (
                                    <div
                                        key={index}
                                        className="group cursor-pointer"
                                        onClick={() => setSelectedVideo(media)}
                                    >
                                        <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300">
                                            <div className="relative h-48 bg-zinc-800">
                                                <img
                                                    src={media.thumbnailUrl}
                                                    alt={media.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent"></div>

                                                {/* Play Button */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-2xl">
                                                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-zinc-900 border-b-8 border-b-transparent ml-1"></div>
                                                    </div>
                                                </div>

                                                {media.videoUrl && (
                                                    <div className="absolute top-2 right-2 bg-zinc-900/80 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                                                        VIDEO
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-white mb-1 line-clamp-1">{media.title}</h3>
                                                <p className="text-zinc-400 text-sm line-clamp-2">{media.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="text-center mt-12">
                            <button
                                onClick={() => router.push("/public-videos")}
                                className="border-2 border-zinc-700 hover:border-zinc-500 text-white font-semibold px-8 py-3 rounded-xl transition-all"
                            >
                                View All Videos
                            </button>
                        </div>
                    </div>
                </section>

                {/* Authentication CTA */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-12 border border-zinc-800 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/10 to-zinc-700/10 rounded-2xl blur-xl"></div>
                            <div className="relative z-10">
                                {!isLoggedIn ? (
                                    <>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-4">
                                            Ready to Share Your Story?
                                        </h2>
                                        <p className="text-xl text-zinc-400 mb-8">
                                            Join thousands of creators who trust ReelCraft with their content
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <button
                                                onClick={() => router.push('/register')}
                                                className="bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105"
                                            >
                                                Sign Up Free
                                            </button>
                                            <button
                                                onClick={() => router.push('/login')}
                                                className="border-2 border-zinc-700 hover:border-zinc-500 text-white font-semibold px-8 py-4 rounded-xl transition-all"
                                            >
                                                Login
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-4">
                                            Start Creating Today
                                        </h2>
                                        <p className="text-xl text-zinc-400 mb-8">
                                            Upload your videos and reach a global audience
                                        </p>
                                        <button
                                            onClick={() => router.push('/dashboard')}
                                            className="bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105"
                                        >
                                            Go to Dashboard
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent text-center mb-16">
                            What Creators Say
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { name: 'Sarah Johnson', role: 'Content Creator', quote: 'ReelCraft made sharing my work super easy and the AI thumbnails are incredible!' },
                                { name: 'Mike Chen', role: 'Photographer', quote: 'Finally, a platform that understands what creators need. The upload speed is unmatched.' },
                                { name: 'Emily Davis', role: 'Video Editor', quote: 'The adaptive streaming feature ensures my videos look great on every device.' },
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-zinc-700 rounded-full mr-4"></div>
                                        <div>
                                            <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                            <p className="text-zinc-400 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="text-zinc-300 italic">{testimonial.quote}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

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
                        <div className="flex justify-between items-start p-6 border-b border-zinc-800">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                                <p className="text-zinc-400 text-sm">{selectedVideo.description}</p>
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

                        <div className="relative bg-black aspect-video">
                            <video src={selectedVideo.videoUrl} controls autoPlay className="w-full h-full" />
                        </div>

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

            {/* Footer */}
            <footer className="bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800 py-16 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-lg"></div>
                                <h3 className="text-xl font-bold text-white">ReelCraft</h3>
                            </div>
                            <p className="text-zinc-400">Share Smarter. Create Faster. Powered by AI.</p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Product</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-zinc-400 hover:text-white transition-colors">Features</a>
                                <a href="#" className="block text-zinc-400 hover:text-white transition-colors">Pricing</a>
                                <a href="#" className="block text-zinc-400 hover:text-white transition-colors">API Docs</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Company</h4>
                            <div className="space-y-2">
                                <a href="#" className="block text-zinc-400 hover:text-white transition-colors">About</a>
                                <a href="#" className="block text-zinc-400 hover:text-white transition-colors">Contact</a>
                                <a href="#" className="block text-zinc-400 hover:text-white transition-colors">Privacy</a>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-white mb-4">Connect</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors">
                                    <span className="text-white">🐙</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors">
                                    <span className="text-white">🐦</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors">
                                    <span className="text-white">💼</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-zinc-800 mt-12 pt-8 text-center">
                        <p className="text-zinc-400">© 2025 ReelCraft. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage
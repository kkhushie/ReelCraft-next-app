"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [filter, setFilter] = useState('popular')
    const router = useRouter()

    // Mock data for carousel
    const carouselItems = [
        { type: 'image', src: '/api/placeholder/600/400', title: 'AI-Generated Thumbnail' },
        { type: 'video', src: '/api/placeholder/600/400', title: 'Adaptive Streaming Video' },
        { type: 'image', src: '/api/placeholder/600/400', title: 'Optimized Upload' },
    ]

    // Mock trending media
    const trendingMedia = [
        { id: 1, type: 'image', src: '/api/placeholder/300/200', title: 'Digital Art', views: '12.5K' },
        { id: 2, type: 'video', src: '/api/placeholder/300/200', title: 'Product Demo', views: '8.2K' },
        { id: 3, type: 'image', src: '/api/placeholder/300/200', title: 'Photography', views: '15.1K' },
        { id: 4, type: 'video', src: '/api/placeholder/300/200', title: 'Tutorial', views: '9.8K' },
        { id: 5, type: 'image', src: '/api/placeholder/300/200', title: 'Design Work', views: '6.4K' },
        { id: 6, type: 'video', src: '/api/placeholder/300/200', title: 'Animation', views: '11.3K' },
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    const handleGetStarted = () => {
        if (isLoggedIn) {
            // Show upload modal or redirect to upload page
            router.push('/upload')
        } else {
            router.push('/register')
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

            {/* Header/Navigation */}
            <header className="relative z-50 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
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
                                    placeholder="Search media..."
                                    className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500"
                                />
                                <div className="absolute right-3 top-2.5">
                                    <div className="w-5 h-5 bg-zinc-600 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center space-x-6">
                            {isLoggedIn ? (
                                <>
                                    <button className="text-zinc-300 hover:text-white transition-colors">Upload</button>
                                    <button className="text-zinc-300 hover:text-white transition-colors">Dashboard</button>
                                    <div className="w-8 h-8 bg-zinc-700 rounded-full"></div>
                                </>
                            ) : (
                                <>
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
                                                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                                                    index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                                                }`}
                                            >
                                                <div className="w-full h-full bg-zinc-800 rounded-xl flex items-center justify-center">
                                                    <div className="text-center">
                                                        <div className="w-16 h-16 bg-zinc-700 rounded-xl mx-auto mb-4"></div>
                                                        <p className="text-zinc-300 font-semibold">{item.title}</p>
                                                    </div>
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
                                                className={`w-2 h-2 rounded-full transition-colors ${
                                                    index === currentSlide ? 'bg-white' : 'bg-zinc-600'
                                                }`}
                                            />
                                        ))}
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
                            
                            {/* Filter buttons */}
                            <div className="flex space-x-2">
                                {['popular', 'latest', 'images', 'videos'].map((filterType) => (
                                    <button
                                        key={filterType}
                                        onClick={() => setFilter(filterType)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                                            filter === filterType
                                                ? 'bg-white text-zinc-900'
                                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                        }`}
                                    >
                                        {filterType}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trendingMedia.map((media) => (
                                <div key={media.id} className="group cursor-pointer">
                                    <div className="bg-zinc-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-600 transition-all duration-300">
                                        <div className="relative h-48 bg-zinc-800">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 bg-zinc-700 rounded-xl"></div>
                                            </div>
                                            {media.type === 'video' && (
                                                <div className="absolute top-2 right-2 bg-zinc-900/80 text-white px-2 py-1 rounded text-xs">
                                                    VIDEO
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-white mb-1">{media.title}</h3>
                                            <p className="text-zinc-400 text-sm">{media.views} views</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <button className="border-2 border-zinc-700 hover:border-zinc-500 text-white font-semibold px-8 py-3 rounded-xl transition-all">
                                Load More
                            </button>
                        </div>
                    </div>
                </section>

                {/* Authentication CTA */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-12 border border-zinc-800">
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
                                        Upload Your First Media
                                    </h2>
                                    <p className="text-xl text-zinc-400 mb-8">
                                        Drag and drop your files or click to browse
                                    </p>
                                    <div className="border-2 border-dashed border-zinc-600 rounded-xl p-8 mb-8">
                                        <div className="text-6xl mb-4">📁</div>
                                        <p className="text-zinc-400">Drop your files here</p>
                                    </div>
                                    <button className="bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105">
                                        Choose Files
                                    </button>
                                </>
                            )}
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

            {/* Footer */}
            <footer className="bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-800 py-16">
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
                        <p className="text-zinc-400">© 2024 ReelCraft. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HomePage
"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        {/* 404 Large Text with Animation */}
        <div className={`mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>

        {/* Main Content Card */}
        <div className={`bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 p-8 md:p-12 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/10 to-zinc-700/10 rounded-2xl blur-xl"></div>
          
          <div className="relative z-10 space-y-6">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl mb-4">
              <span className="text-5xl">🔍</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
              Page Not Found
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for seems to have wandered off into the digital void. 
              It might have been removed, renamed, or never existed in the first place.
            </p>

            {/* Suggestions */}
            <div className="bg-zinc-800/50 rounded-xl p-6 mt-8 border border-zinc-700/50">
              <h3 className="text-sm font-semibold text-zinc-200 mb-4">Here&apos;s what you can do:</h3>
              <ul className="space-y-3 text-zinc-400 text-sm text-left max-w-md mx-auto">
                <li className="flex items-start">
                  <span className="mr-3 mt-0.5 text-zinc-500">•</span>
                  <span>Double-check the URL for any typos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-0.5 text-zinc-500">•</span>
                  <span>Use the navigation menu to find what you need</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-0.5 text-zinc-500">•</span>
                  <span>Head back to the homepage and start fresh</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-0.5 text-zinc-500">•</span>
                  <span>Search for the content you&apos;re looking for</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button 
                onClick={() => router.push('/')}
                className="bg-white hover:bg-zinc-100 text-zinc-900 font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/25"
              >
                Back to Home
              </button>
              <button 
                onClick={() => router.back()}
                className="border-2 border-zinc-700 hover:border-zinc-500 text-white font-semibold px-8 py-4 rounded-xl transition-all"
              >
                Go Back
              </button>
            </div>

            {/* Additional Help */}
            <div className="pt-8 border-t border-zinc-800 mt-8">
              <p className="text-zinc-400 text-sm">
                Still need help?{" "}
                <a 
                  href="/contact" 
                  className="text-white hover:text-zinc-200 font-semibold transition duration-300 hover:underline decoration-2 underline-offset-4"
                >
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Popular Pages */}
        <div className={`mt-12 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-zinc-400 mb-6">Or explore these popular pages:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Home', href: '/', icon: '🏠' },
              { name: 'Dashboard', href: '/dashboard', icon: '📊' },
              { name: 'Upload', href: '/upload', icon: '📤' },
              { name: 'Login', href: '/login', icon: '🔐' },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="bg-zinc-900/60 backdrop-blur-xl rounded-xl p-4 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                  {link.name}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Fun Easter Egg */}
        <div className={`mt-12 transition-all duration-1000 delay-600 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-zinc-600 text-xs italic">
            Not all those who wander are lost... but this page definitely is.🗺️
          </p>
        </div>
      </div>
    </div>
  )
}
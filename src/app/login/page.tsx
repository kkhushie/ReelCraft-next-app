"use client"
import { useRouter } from 'next/navigation'
import {signIn} from "next-auth/react"
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
           const res=await signIn("credentials",{
            email,
            password,
            redirect:false,
           })
           if(res?.error){
                console.log(res.error)
           }
           else{
            router.push("/")
           }
          
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            
            <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-2xl mb-6 border border-zinc-700 shadow-2xl">
                            <div className="w-8 h-8 bg-gradient-to-br from-zinc-400 to-zinc-600 rounded-lg"></div>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-3">
                            Welcome Back
                        </h1>
                        <p className="text-zinc-400 text-lg">Sign in to your account</p>
                    </div>
                    
                    {/* Main form container */}
                    <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 p-8 relative">
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/10 to-zinc-700/10 rounded-2xl blur-xl"></div>
                        
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-semibold text-zinc-200 mb-3">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <input 
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all duration-300 group-hover:border-zinc-600"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-600/0 to-zinc-500/0 group-focus-within:from-zinc-600/5 group-focus-within:to-zinc-500/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-semibold text-zinc-200 mb-3">
                                    Password
                                </label>
                                <div className="relative group">
                                    <input 
                                        id="password"
                                        type="password" 
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-4 bg-zinc-800/50 border-2 border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:bg-zinc-800 transition-all duration-300 group-hover:border-zinc-600"
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-zinc-600/0 to-zinc-500/0 group-focus-within:from-zinc-600/5 group-focus-within:to-zinc-500/5 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            {/* Additional login options */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 text-zinc-400">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 bg-zinc-800 border-2 border-zinc-600 rounded focus:ring-zinc-500 focus:ring-2"
                                    />
                                    <span>Remember me</span>
                                </label>
                                <a href="/forgot-password" className="text-white hover:text-zinc-200 font-semibold hover:underline decoration-2 underline-offset-4">
                                    Forgot password?
                                </a>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    className="w-full relative group bg-white hover:bg-zinc-100 text-zinc-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-white/25"
                                >
                                    <span className="relative z-10">Sign In</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-100 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-zinc-900/80 text-zinc-400">Or continue with</span>
                            </div>
                        </div>

                        {/* Social login buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center px-4 py-3 border-2 border-zinc-700 rounded-xl hover:border-zinc-600 transition-all duration-300 group" onClick={() => signIn("google", { redirect: false  })}>
                                <div className="w-5 h-5 bg-white rounded mr-2"></div>
                                <span className="text-zinc-300 font-medium">Google</span>
                            </button>
                            <button className="flex items-center justify-center px-4 py-3 border-2 border-zinc-700 rounded-xl hover:border-zinc-600 transition-all duration-300 group" onClick={()=>signIn("github")}>
                                <div className="w-5 h-5 bg-zinc-200 rounded mr-2"></div>
                                <span className="text-zinc-300 font-medium">GitHub</span>
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-zinc-400">
                            Dont have an account?{" "}
                            <a 
                                href="/register" 
                                className="text-white hover:text-zinc-200 font-semibold transition duration-300 hover:underline decoration-2 underline-offset-4"
                            >
                                Create one here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
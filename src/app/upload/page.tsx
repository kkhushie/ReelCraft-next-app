"use client"

import FileUpload from "@/app/components/FileUpload";
import { useState } from "react";

export default function UploadPage() {
  interface UploadedFile {
    url: string;
  }

  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [progress, setProgress] = useState(0);

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
        <div className="max-w-3xl w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-800 rounded-2xl mb-6 border border-zinc-700 shadow-2xl">
              <div className="text-3xl">📤</div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent mb-3">
              Upload Your Content
            </h1>
            <p className="text-zinc-400 text-lg">Share your videos with the world</p>
          </div>
          
          {/* Main upload container */}
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-zinc-800 p-8 relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/10 to-zinc-700/10 rounded-2xl blur-xl"></div>
            
            <div className="space-y-6 relative z-10">
              {/* Upload Area */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-zinc-200 mb-3">
                  Select Video File
                </label>
                
                <div className="relative">
                  <FileUpload
                    fileType="video"
                    onSuccess={(res) => setUploadedFile(res as UploadedFile)}
                    onProgress={(p) => setProgress(p)}
                  />
                </div>
              </div>

              {/* Progress Bar */}
              {progress > 0 && progress < 100 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-zinc-200">Uploading...</span>
                    <span className="text-sm font-bold text-white">{progress}%</span>
                  </div>
                  
                  <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-zinc-400 to-zinc-500 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-zinc-400 text-center">
                    Please wait while we upload your file...
                  </p>
                </div>
              )}

              {/* Success State */}
              {uploadedFile && progress === 100 && (
                <div className="mt-6 bg-zinc-800/50 backdrop-blur-xl rounded-xl border-2 border-zinc-600 p-6 space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-500/50">
                      <span className="text-2xl">✅</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Upload Successful!</h3>
                      <p className="text-sm text-zinc-400">Your file has been uploaded successfully</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-zinc-300">
                      File URL:
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 overflow-hidden">
                        <a 
                          href={uploadedFile.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-zinc-300 hover:text-white transition-colors break-all text-sm"
                        >
                          {uploadedFile.url}
                        </a>
                      </div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(uploadedFile.url)}
                        className="flex-shrink-0 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white px-4 py-3 rounded-lg transition-all font-medium"
                        title="Copy to clipboard"
                      >
                        📋
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a 
                      href={uploadedFile.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 text-center bg-white hover:bg-zinc-100 text-zinc-900 font-semibold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.02]"
                    >
                      View File
                    </a>
                    <button 
                      onClick={() => {
                        setUploadedFile(null);
                        setProgress(0);
                      }}
                      className="flex-1 text-center border-2 border-zinc-700 hover:border-zinc-500 text-white font-semibold py-3 px-4 rounded-xl transition-all"
                    >
                      Upload Another
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Guidelines */}
              {!uploadedFile && progress === 0 && (
                <div className="mt-6 bg-zinc-800/30 rounded-xl p-6 border border-zinc-700/50">
                  <h3 className="text-sm font-semibold text-zinc-200 mb-3">📋 Upload Guidelines</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>Maximum file size: 500MB</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>Supported formats: MP4, MOV, AVI, WebM</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>Recommended resolution: 1080p or higher</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>AI thumbnails will be generated automatically</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Back to Dashboard Link */}
          <div className="text-center mt-8">
            <a 
              href="/dashboard" 
              className="text-zinc-400 hover:text-white transition-colors inline-flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
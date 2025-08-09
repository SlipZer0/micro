"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { NextPage } from "next";
import { ArrowLeftIcon, CheckIcon, PlayIcon, UsersIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

const CourseDetailPage: NextPage = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [liveCounter, setLiveCounter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Course data based on courseId
  const courseData: Record<string, any> = {
    dpw9EHDh2bM: {
      title: "Advanced React Patterns",
      creator: "Dan Abramov",
      price: "0.008",
      duration: "2h 15m",
      rating: 4.9,
      reviews: 1247,
      students: 5423,
      thumbnail: "https://img.youtube.com/vi/dpw9EHDh2bM/maxresdefault.jpg",
      videoId: "dpw9EHDh2bM",
      description:
        "Master advanced React patterns including render props, higher-order components, custom hooks, and performance optimization techniques. This comprehensive course takes you from intermediate to expert level React development.",
      longDescription:
        "This course is designed for React developers who want to take their skills to the next level. You'll learn advanced patterns that are used in production applications, understand the why behind the patterns, and know when to apply them. We'll cover render props, higher-order components, custom hooks, compound components, and much more.",
      learningOutcomes: [
        "Master render props pattern and its use cases",
        "Build reusable higher-order components",
        "Create custom hooks for shared logic",
        "Implement compound components pattern",
        "Optimize React performance with advanced techniques",
        "Handle complex state management scenarios",
      ],
      curriculum: [
        { title: "Introduction to Advanced Patterns", duration: "15:30", free: true },
        { title: "Render Props Deep Dive", duration: "22:45", free: false },
        { title: "Higher-Order Components Mastery", duration: "28:20", free: false },
        { title: "Custom Hooks Best Practices", duration: "25:10", free: false },
        { title: "Compound Components Pattern", duration: "20:35", free: false },
        { title: "Performance Optimization Techniques", duration: "30:15", free: false },
        { title: "Real-World Application", duration: "18:45", free: false },
      ],
      instructor: {
        name: "Dan Abramov",
        bio: "Co-author of Redux and Create React App. React core team member at Facebook.",
        courses: 12,
        students: 45000,
        rating: 4.9,
      },
    },
    wm5gMKuwSYk: {
      title: "Next.js 14 Complete Guide",
      creator: "Lee Robinson",
      price: "0.006",
      duration: "3h 30m",
      rating: 4.8,
      reviews: 892,
      students: 3421,
      thumbnail: "https://img.youtube.com/vi/wm5gMKuwSYk/maxresdefault.jpg",
      videoId: "wm5gMKuwSYk",
      description:
        "Complete guide to Next.js 14 with App Router, Server Components, and the latest features. Build modern, performant web applications.",
      longDescription:
        "Learn Next.js 14 from scratch with hands-on examples. This course covers everything from basic setup to advanced deployment strategies, including the new App Router, Server Components, and Streaming.",
      learningOutcomes: [
        "Build full-stack applications with Next.js 14",
        "Master the App Router architecture",
        "Implement Server Components effectively",
        "Handle data fetching and caching",
        "Deploy to production with best practices",
      ],
      curriculum: [
        { title: "Next.js 14 Introduction", duration: "12:30", free: true },
        { title: "App Router Deep Dive", duration: "35:45", free: false },
        { title: "Server Components", duration: "28:20", free: false },
        { title: "Data Fetching Strategies", duration: "32:10", free: false },
        { title: "Styling and UI", duration: "25:35", free: false },
        { title: "Authentication & Security", duration: "30:15", free: false },
        { title: "Deployment & Performance", duration: "26:45", free: false },
      ],
      instructor: {
        name: "Lee Robinson",
        bio: "VP of Developer Experience at Vercel. Next.js maintainer and educator.",
        courses: 8,
        students: 28000,
        rating: 4.8,
      },
    },
  };

  const course = courseData[courseId] || courseData["dpw9EHDh2bM"];
  const estimatedTotalCost = (
    (parseInt(course.duration.split("h")[0]) * 60 + parseInt(course.duration.split(" ")[1].split("m")[0])) *
    60 *
    parseFloat(course.price)
  ).toFixed(2);

  // Simulate live counter when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && sessionStarted) {
      interval = setInterval(() => {
        setLiveCounter(prev => prev + parseFloat(course.price));
        setWatchTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sessionStarted, course.price]);

  const handleStartLearning = () => {
    // Step 1: Just open modal, don't start video or payment yet
    setShowVideoModal(true);
    setVideoLoaded(false);
    setSessionStarted(false);
    setIsPlaying(false);
    // Reset counters for new session
    setLiveCounter(0);
    setWatchTime(0);
  };

  const handleStartVideo = useCallback(() => {
    // Step 2: Load video and start payment when user clicks play
    if (!videoLoaded) {
      setVideoLoaded(true);
      setSessionStarted(true);
      setIsPlaying(true);
    }
    // Play the actual video
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [videoLoaded]);

  const handleCloseModal = useCallback(() => {
    setShowVideoModal(false);
    setIsPlaying(false);
    setSessionStarted(false);
    setVideoLoaded(false);
    setShowNotification(false);
    // Keep counters to show final cost
  }, []);

  const showNotificationMessage = useCallback((message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!sessionStarted) {
      // If session hasn't started, start it
      handleStartVideo();
      showNotificationMessage("Video started! Payment tracking begins now.");
    } else {
      // Toggle both video playback AND payment
      const newPlayingState = !isPlaying;
      setIsPlaying(newPlayingState);

      // Control actual video playback
      if (videoRef.current) {
        if (newPlayingState) {
          videoRef.current.play();
          showNotificationMessage("Video resumed! Payment is now active.");
        } else {
          videoRef.current.pause();
          showNotificationMessage("Video paused! Payment stopped.");
        }
      }
    }
  }, [sessionStarted, isPlaying, handleStartVideo, showNotificationMessage]);

  // Real video player component with actual video playback
  const RealVideoPlayer = () => {
    if (!videoLoaded) return null;

    return (
      <div className="w-full h-full bg-black relative overflow-hidden">
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={course.thumbnail}
          preload="metadata"
          onPlay={() => {
            if (!isPlaying) setIsPlaying(true);
          }}
          onPause={() => {
            if (isPlaying) setIsPlaying(false);
          }}
        >
          {/* Using sample video files - you can replace these with actual course videos */}
          <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          {/* Fallback message */}
          Your browser does not support the video tag.
        </video>

        {/* Payment Status Overlay */}
        <div className="absolute top-4 left-4">
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all backdrop-blur-sm ${
              isPlaying ? "bg-red-500/90 text-white animate-pulse" : "bg-gray-500/90 text-white"
            }`}
          >
            {isPlaying ? "🔴 STREAMING - Payment Active" : "⏸️ Video Paused - No Payment"}
          </div>
        </div>

        {/* Payment Animation Overlay */}
        {isPlaying && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Animated payment indicators */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-2 bg-green-500/90 px-3 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                <span className="text-white text-sm font-semibold">💰 ${course.price}/sec</span>
              </div>
            </div>

            {/* Floating money emojis */}
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-green-400 text-xl animate-bounce opacity-70"
                  style={{
                    left: `${20 + i * 25}%`,
                    bottom: `${20 + (i % 2) * 15}%`,
                    animationDelay: `${i * 0.8}s`,
                    animationDuration: "2s",
                  }}
                >
                  💰
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Course Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <h3 className="text-white font-bold text-lg mb-1">{course.title}</h3>
            <div className="text-sm text-gray-300">FlowLearn - Real video with pay-per-second billing</div>
            <div className="text-xs text-gray-400 mt-1">
              Status: {isPlaying ? "Video Playing + Payment Active 💰" : "Video Paused + Payment Stopped ⏸️"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VideoPlayerModal = () => (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${showVideoModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={handleCloseModal}></div>

      <div className="relative h-full flex items-center justify-center p-6">
        <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden max-w-6xl w-full max-h-[90vh]">
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            {videoLoaded ? (
              <RealVideoPlayer />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 text-white text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-purple-200">Ready to start your learning journey?</p>
                  <p className="text-sm text-purple-200 mt-2">
                    You&apos;ll be charged ${course.price}/second while video plays
                  </p>
                  <p className="text-xs text-purple-300 mt-2">
                    🎬 Real Video Player - Actual video playback with payment tracking
                  </p>
                </div>
                <button
                  onClick={handleStartVideo}
                  className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform group mb-4"
                >
                  <PlayIcon className="w-12 h-12 text-white ml-2 group-hover:scale-110 transition-transform" />
                </button>
                <div className="text-sm text-purple-200">Click to load video and start playing</div>
              </div>
            )}

            {/* Notification */}
            {showNotification && (
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-blue-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold animate-slide-in shadow-lg">
                  {notificationMessage}
                </div>
              </div>
            )}

            {/* Live Payment Overlay */}
            {showVideoModal && (
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-gradient-to-r from-black/90 to-purple-900/90 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    {/* Left - Status */}
                    <div className="flex items-center space-x-4 text-white">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            !sessionStarted ? "bg-gray-400" : isPlaying ? "bg-green-400 animate-pulse" : "bg-yellow-400"
                          }`}
                        ></div>
                        <span className="text-sm font-medium">
                          {!sessionStarted ? "READY" : isPlaying ? "STREAMING" : "PAUSED"}
                        </span>
                      </div>
                      <div className="text-lg font-mono">
                        {Math.floor(watchTime / 60)}:{(watchTime % 60).toString().padStart(2, "0")}
                      </div>
                    </div>

                    {/* Center - Live Counter */}
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold font-mono ${
                          !sessionStarted
                            ? "text-gray-400"
                            : isPlaying
                              ? "text-green-400 animate-pulse"
                              : "text-green-400"
                        }`}
                      >
                        ${liveCounter.toFixed(3)} USDC
                      </div>
                      <div className="text-sm text-gray-300">
                        {!sessionStarted
                          ? "Click ▶️ to start video &amp; payment"
                          : isPlaying
                            ? `+$${course.price}/sec (video playing)`
                            : "Video paused - no payment"}
                      </div>
                    </div>

                    {/* Right - Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <button
                          onClick={handlePlayPause}
                          className={`${
                            !sessionStarted
                              ? "bg-green-500 hover:bg-green-600"
                              : isPlaying
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-green-500 hover:bg-green-600"
                          } text-white p-3 rounded-full transition-colors`}
                          title={
                            !sessionStarted
                              ? "Start video & payment"
                              : isPlaying
                                ? "Pause payment only"
                                : "Resume payment"
                          }
                        >
                          {!sessionStarted ? "▶️" : isPlaying ? "⏸️" : "▶️"}
                        </button>
                        <div className="text-xs text-gray-400 mt-1">
                          {!sessionStarted ? "Start" : isPlaying ? "Pause Pay" : "Resume Pay"}
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={handleCloseModal}
                          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors"
                          title="Stop session and close"
                        >
                          ⏹️
                        </button>
                        <div className="text-xs text-gray-400 mt-1">Stop</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Course Info Panel */}
          <div className="p-6 bg-gradient-to-r from-slate-900 to-purple-900">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>👁️ 1,234 watching now</span>
                  <span>⏱️ {course.duration} total</span>
                  <span>💰 Est. total: ${estimatedTotalCost}</span>
                </div>
              </div>

              <div className="bg-black/20 rounded-2xl p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-400">${liveCounter.toFixed(3)}</div>
                    <div className="text-xs text-gray-400">Spent</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-400">
                      {Math.floor(watchTime / 60)}:{(watchTime % 60).toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-400">Watched</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">${estimatedTotalCost}</div>
                    <div className="text-xs text-gray-400">Full Course</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleCloseModal}
          className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Top Navigation */}
        <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-2xl font-bold text-white">FlowLearn</span>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/courses" className="text-purple-400 font-semibold">
                  Courses
                </Link>
                <Link href="/creators" className="text-white/70 hover:text-white transition-colors">
                  Creators
                </Link>
                <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button className="text-white p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          {/* Back Button */}
          <Link
            href="/courses"
            className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors mb-8"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Courses</span>
          </Link>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Preview Section */}
              <div className="relative">
                <div className="aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 relative group cursor-pointer">
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-all">
                    <button
                      onClick={handleStartLearning}
                      className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <PlayIcon className="w-12 h-12 text-white ml-2" />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-sm opacity-75 mb-1">Free Preview Available</div>
                    <div className="text-lg font-semibold">First 15 minutes free</div>
                  </div>
                  <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white font-semibold">
                    {course.duration}
                  </div>
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl font-bold text-white mb-6">{course.title}</h1>
                  <p className="text-xl text-white/80 leading-relaxed mb-6">{course.description}</p>
                  <p className="text-white/70 leading-relaxed">{course.longDescription}</p>
                </div>

                {/* Instructor Info */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Instructor</h3>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {course.instructor.name[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">{course.instructor.name}</h4>
                      <p className="text-white/70 mb-3">{course.instructor.bio}</p>
                      <div className="flex items-center space-x-6 text-sm text-white/60">
                        <div className="flex items-center space-x-1">
                          <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                          <span>{course.instructor.rating}</span>
                        </div>
                        <span>👥 {course.instructor.students.toLocaleString()} students</span>
                        <span>📚 {course.instructor.courses} courses</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">What You&apos;ll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.learningOutcomes.map((outcome: string, i: number) => (
                      <div key={i} className="flex items-start space-x-3">
                        <CheckIcon className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">Course Content</h3>
                  <div className="space-y-3">
                    {course.curriculum.map((lesson: any, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-white/10"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm text-purple-400 font-semibold">
                            {i + 1}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{lesson.title}</h4>
                            {lesson.free && (
                              <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mt-1">
                                FREE PREVIEW
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400 text-sm">{lesson.duration}</span>
                          {lesson.free ? (
                            <PlayIcon className="w-5 h-5 text-green-400 cursor-pointer" />
                          ) : (
                            <div className="w-5 h-5 border border-gray-500 rounded flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-500 rounded"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-6">
                  {/* Price Display */}
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-3">${course.price}</div>
                    <div className="text-white/70 text-lg">per second</div>
                    <div className="text-sm text-purple-300 mt-3">≈ ${estimatedTotalCost} if watched completely</div>
                  </div>

                  {/* Cost Examples */}
                  <div className="bg-black/20 rounded-2xl p-4 space-y-3">
                    <div className="text-center text-white/70 text-sm font-semibold mb-3">Estimated Costs</div>
                    {[
                      { duration: "10 minutes", cost: (10 * 60 * parseFloat(course.price)).toFixed(2) },
                      { duration: "30 minutes", cost: (30 * 60 * parseFloat(course.price)).toFixed(2) },
                      { duration: "1 hour", cost: (60 * 60 * parseFloat(course.price)).toFixed(2) },
                      { duration: "Full course", cost: estimatedTotalCost },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.duration}:</span>
                        <span className="text-white font-semibold">${item.cost}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={handleStartLearning}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold text-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
                  >
                    Start Learning Now
                  </button>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon key={i} className="w-4 h-4" />
                        ))}
                      </div>
                      <div className="text-white font-semibold">{course.rating}</div>
                      <div className="text-white/60 text-sm">({course.reviews} reviews)</div>
                    </div>
                    <div>
                      <UsersIcon className="w-8 h-8 text-blue-400 mx-auto mb-1" />
                      <div className="text-white font-semibold">{course.students.toLocaleString()}</div>
                      <div className="text-white/60 text-sm">students enrolled</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 text-sm">
                    {[
                      "Pay only for time watched",
                      "Pause anytime to save money",
                      "No upfront commitment",
                      "Instant access to content",
                      "Mobile & desktop streaming",
                      "Creator earnings in real-time",
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center space-x-2 text-gray-300">
                        <CheckIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal />
    </>
  );
};

export default CourseDetailPage;

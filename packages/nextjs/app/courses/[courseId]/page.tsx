"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { NextPage } from "next";
import { ArrowLeftIcon, CheckIcon, PlayIcon, UsersIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

// Stable Video Modal Component - defined outside to prevent recreation
const VideoPlayerModal = ({
  showVideoModal,
  course,
  videoRef,
  setIsPlaying,
  handleCloseModal,
  estimatedTotalCost,
  isPlaying,
  liveCounter,
  watchTime,
}: {
  showVideoModal: boolean;
  course: any;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  setIsPlaying: (playing: boolean) => void;
  handleCloseModal: () => void;
  estimatedTotalCost: string;
  isPlaying: boolean;
  liveCounter: number;
  watchTime: number;
}) => {
  // Manual play/pause handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.log("Play failed:", error);
        });
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${showVideoModal ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={handleCloseModal}></div>

      <div className="relative h-full flex items-center justify-center p-6">
        <div className="bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh]">
          {/* Video Section */}
          <div className="relative aspect-video bg-black group">
            <video
              ref={videoRef}
              controls
              className="w-full h-full object-cover"
              onPlay={() => {
                console.log("Video started playing");
                setIsPlaying(true);
              }}
              onPause={() => {
                console.log("Video paused");
                setIsPlaying(false);
              }}
              onError={e => console.error("Video error:", e)}
              onLoadStart={() => console.log("Loading started")}
              onCanPlay={() => console.log("Can play")}
            >
              <source src="/videos/advanced-react-patterns.mp4" type="video/mp4" />
              <p className="text-white">Video not supported or failed to load.</p>
            </video>

            {/* Payment Status Indicator - Top Left */}
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isPlaying ? "bg-green-400" : "bg-gray-400"} pulse`}></div>
              <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-semibold">
                {isPlaying ? "PAYING" : "PAUSED"}
              </div>
            </div>

            {/* Live Counter - Top Right */}
            <div className="absolute top-4 right-4 z-10 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg">
              <div className="text-white text-right">
                <div className="text-xs opacity-70">Current Cost</div>
                <div className="text-lg font-bold text-green-400">${liveCounter.toFixed(3)}</div>
                <div className="text-xs opacity-70">{watchTime}s watched</div>
              </div>
            </div>

            {/* Center Play/Pause Overlay - Shows on hover or when paused */}
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100 bg-black/20" : "opacity-100 bg-black/40"}`}
            >
              <button
                onClick={handlePlayPause}
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all"
              >
                {isPlaying ? (
                  // Pause Icon
                  <div className="flex space-x-1">
                    <div className="w-2 h-8 bg-white rounded"></div>
                    <div className="w-2 h-8 bg-white rounded"></div>
                  </div>
                ) : (
                  // Play Icon
                  <PlayIcon className="w-10 h-10 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Payment Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex justify-between items-center text-white text-sm">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold">${course.price}/sec</span>
                  <span className="opacity-70">•</span>
                  <span className="opacity-70">Est. total: ${estimatedTotalCost}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>Live billing active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Info Panel */}
          <div className="p-6 bg-gradient-to-r from-slate-900 to-purple-900">
            <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{course.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>💰 ${course.price}/sec</span>
              <span>⏱️ {course.duration} total</span>
              <span>💵 Est. total: ${estimatedTotalCost}</span>
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
};

const CourseDetailPage: NextPage = () => {
  // Get course ID from URL parameters
  const params = useParams();
  const courseId = params?.courseId as string;

  // Essential state management
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liveCounter, setLiveCounter] = useState(0);
  const [watchTime, setWatchTime] = useState(0);

  // Video reference for direct control
  const videoRef = useRef<HTMLVideoElement>(null);

  // Course data structure
  const courseData = {
    "react-compiler-2025": {
      title: "React Compiler Tutorial 2025",
      creator: "React Expert",
      price: "0.008",
      duration: "1h 45m",
      rating: 4.9,
      reviews: 856,
      students: 2134,
      thumbnail: "/videos/react-compiler-thumbnail.jpg",
      videoFile: "/videos/advanced-react-patterns.mp4",
      description:
        "Learn the new React Compiler in 2025 - Everything you need to know about the latest React features and optimizations.",
      longDescription:
        "This comprehensive course covers the React Compiler introduced in 2025, including automatic optimizations, performance improvements, and how it changes the way we write React code.",
      learningOutcomes: [
        "Understand the React Compiler architecture",
        "Learn automatic optimization techniques",
        "Master performance improvements with the compiler",
        "Apply compiler features in real projects",
      ],
      instructor: {
        name: "React Expert",
        bio: "Senior React developer with expertise in compiler technologies.",
        courses: 8,
        students: 12000,
        rating: 4.9,
      },
    },
    dpw9EHDh2bM: {
      title: "Advanced React Patterns",
      creator: "Dan Abramov",
      price: "0.008",
      duration: "2h 15m",
      rating: 4.9,
      reviews: 1247,
      students: 5423,
      thumbnail: "https://img.youtube.com/vi/dpw9EHDh2bM/maxresdefault.jpg",
      videoFile: "/videos/advanced-react-patterns.mp4",
      description:
        "Master advanced React patterns including render props, higher-order components, custom hooks, and performance optimization techniques.",
      longDescription:
        "This course is designed for React developers who want to take their skills to the next level. You&apos;ll learn advanced patterns that are used in production applications.",
      learningOutcomes: [
        "Master render props pattern and its use cases",
        "Build reusable higher-order components",
        "Create custom hooks for shared logic",
        "Optimize React performance with advanced techniques",
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
      videoFile: "/videos/advanced-react-patterns.mp4",
      description: "Complete guide to Next.js 14 with App Router, Server Components, and the latest features.",
      longDescription:
        "Learn Next.js 14 from scratch with hands-on examples. This course covers everything from basic setup to advanced deployment strategies.",
      learningOutcomes: [
        "Build full-stack applications with Next.js 14",
        "Master the App Router architecture",
        "Implement Server Components effectively",
        "Deploy to production with best practices",
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

  // Get current course (with fallback)
  const course = courseData[courseId as keyof typeof courseData] || courseData["dpw9EHDh2bM"];

  // Calculate estimated total cost
  const estimatedTotalCost = (
    (parseInt(course.duration.split("h")[0]) * 60 + parseInt(course.duration.split(" ")[1].split("m")[0])) *
    60 *
    parseFloat(course.price)
  ).toFixed(2);

  // Payment tracking effect - increments counter every second when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setLiveCounter(prev => prev + parseFloat(course.price));
        setWatchTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, course.price]);

  // Modal handlers with auto-start functionality
  const handleStartLearning = () => {
    setShowVideoModal(true);
    setLiveCounter(0);
    setWatchTime(0);

    // Auto-start the video after modal opens
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.log("Autoplay failed, user needs to click play:", error);
        });
      }
    }, 500);
  };

  const handleCloseModal = useCallback(() => {
    setShowVideoModal(false);
    setIsPlaying(false);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        {/* Navigation Header */}
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
              {/* Hero Video Preview */}
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
                    <div className="text-sm opacity-75 mb-1">Ready to Learn?</div>
                    <div className="text-lg font-semibold">Click to start</div>
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
      <VideoPlayerModal
        showVideoModal={showVideoModal}
        course={course}
        videoRef={videoRef}
        setIsPlaying={setIsPlaying}
        handleCloseModal={handleCloseModal}
        estimatedTotalCost={estimatedTotalCost}
        isPlaying={isPlaying}
        liveCounter={liveCounter}
        watchTime={watchTime}
      />
    </>
  );
};

export default CourseDetailPage;

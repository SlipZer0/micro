"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ClockIcon, CurrencyDollarIcon, PlayIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [liveCounter] = useState(0.045);

  // Demo courses data with YouTube videos
  const featuredCourses = [
    {
      title: "Advanced React Patterns",
      creator: "Dan Abramov",
      price: "0.008",
      duration: "2h 15m",
      rating: 4.9,
      students: 1247,
      thumbnail: "https://img.youtube.com/vi/dpw9EHDh2bM/maxresdefault.jpg",
      videoId: "dpw9EHDh2bM",
    },
    {
      title: "Next.js 14 Complete Guide",
      creator: "Lee Robinson",
      price: "0.006",
      duration: "3h 30m",
      rating: 4.8,
      students: 892,
      thumbnail: "https://img.youtube.com/vi/wm5gMKuwSYk/maxresdefault.jpg",
      videoId: "wm5gMKuwSYk",
    },
    {
      title: "Web3 Development Fundamentals",
      creator: "Patrick Collins",
      price: "0.010",
      duration: "1h 45m",
      rating: 4.9,
      students: 2134,
      thumbnail: "https://img.youtube.com/vi/gyMwXuJrbJQ/maxresdefault.jpg",
      videoId: "gyMwXuJrbJQ",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">F</span>
              </div>
              <span className="text-3xl font-bold text-white">FlowLearn</span>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8 text-white/80">
                <Link href="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
                <Link href="/creators" className="hover:text-white transition-colors">
                  Creators
                </Link>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Dashboard
                </Link>
              </nav>
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                <Address address={connectedAddress} />
              </div>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="text-center mb-20">
            <h1 className="text-7xl md:text-8xl font-bold text-white leading-tight mb-8">
              Only Pay for What You
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                Learn
              </span>
            </h1>

            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-12">
              Revolutionary pay-per-second learning platform. Watch courses and pay only for consumed time with
              stablecoins.
              <span className="block mt-2 text-purple-300">
                No wasted money. No fixed subscriptions. Just pure learning.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/courses"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105"
              >
                Start Learning Now
              </Link>
              <Link
                href="/creators"
                className="border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 backdrop-blur-md transition-all"
              >
                Become a Creator
              </Link>
            </div>
          </div>

          {/* Live Demo Counter */}
          <div className="max-w-2xl mx-auto mb-20">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
              <div className="text-white/70 mb-2">💡 Live Demo</div>
              <div className="flex items-center justify-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white">STREAMING</span>
                </div>
                <div className="text-5xl font-mono font-bold text-green-400">${liveCounter.toFixed(3)} USDC</div>
                <div className="text-white/70">• 45 seconds</div>
              </div>
              <div className="text-white/60">Watching: &quot;Advanced React Patterns&quot; at $0.001/second</div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <CurrencyDollarIcon className="w-12 h-12" />,
                title: "Pay Per Second",
                desc: "Revolutionary micropayments - only pay for content you actually consume",
              },
              {
                icon: <ClockIcon className="w-12 h-12" />,
                title: "Gasless Experience",
                desc: "Seamless Layer-2 transactions with zero gas fees for learners",
              },
              {
                icon: <UsersIcon className="w-12 h-12" />,
                title: "Creator Earnings",
                desc: "Creators earn continuously as students learn - fair compensation guaranteed",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all hover:scale-105"
              >
                <div className="text-purple-300 mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="bg-gradient-to-b from-slate-900 to-purple-900 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Trending Courses</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Start learning with our most popular courses. Pay only for what you watch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCourses.map((course, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
              >
                {/* Course Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <PlayIcon className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                    {course.duration}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-75">Preview available</div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {course.title}
                  </h3>

                  {/* Creator */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span className="text-white/70">{course.creator}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span>{course.rating}</span>
                      </div>
                      <span>👥 {course.students}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-400">${course.price}</span>
                      <span className="text-white/60">/sec</span>
                    </div>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/15 transition-all"
            >
              View All Courses →
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,247", label: "Active Learners", icon: "👥" },
              { number: "$84,329", label: "Creator Earnings", icon: "💰" },
              { number: "1,547", label: "Hours Watched", icon: "⏱️" },
              { number: "156", label: "Live Courses", icon: "📚" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { FunnelIcon, MagnifyingGlassIcon, PlayIcon } from "@heroicons/react/24/outline";

const CoursesPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Extended courses data with YouTube videos
  const VIDEO_ID = "wm5gMKuwSYk";
  const allCourses = [
    {
      title: "Advanced React Patterns",
      creator: "Dan Abramov",
      price: "0.008",
      duration: "2h 15m",
      rating: 4.9,
      students: 1247,
      category: "Programming",
      thumbnail: "https://img.youtube.com/vi/dpw9EHDh2bM/maxresdefault.jpg",
      videoId: VIDEO_ID,
      description: "Master advanced React patterns including render props, higher-order components, and custom hooks.",
    },
    {
      title: "Next.js 14 Complete Guide",
      creator: "Lee Robinson",
      price: "0.006",
      duration: "3h 30m",
      rating: 4.8,
      students: 892,
      category: "Programming",
      thumbnail: "https://img.youtube.com/vi/wm5gMKuwSYk/maxresdefault.jpg",
      videoId: VIDEO_ID,
      description: "Complete guide to Next.js 14 with App Router, Server Components, and more.",
    },
    {
      title: "Web3 Development Fundamentals",
      creator: "Patrick Collins",
      price: "0.010",
      duration: "1h 45m",
      rating: 4.9,
      students: 2134,
      category: "Blockchain",
      thumbnail: "https://img.youtube.com/vi/gyMwXuJrbJQ/maxresdefault.jpg",
      videoId: VIDEO_ID,
      description: "Learn the fundamentals of Web3 development from smart contracts to dApps.",
    },
    {
      title: "UI/UX Design Masterclass",
      creator: "Sarah Johnson",
      price: "0.007",
      duration: "2h 50m",
      rating: 4.7,
      students: 1567,
      category: "Design",
      thumbnail: "https://img.youtube.com/vi/c9Wg6Cb_YlU/maxresdefault.jpg",
      videoId: VIDEO_ID,
      description: "Complete UI/UX design course covering design systems, prototyping, and user research.",
    },
    {
      title: "TypeScript Deep Dive",
      creator: "Matt Pocock",
      price: "0.009",
      duration: "1h 30m",
      rating: 4.8,
      students: 1890,
      category: "Programming",
      thumbnail: "https://img.youtube.com/vi/30LWjhZzg50/maxresdefault.jpg",
      videoId: VIDEO_ID,
      description: "Deep dive into TypeScript with advanced types, generics, and best practices.",
    },
    {
      title: "Solidity Smart Contracts",
      creator: "Austin Griffith",
      price: "0.012",
      duration: "3h 15m",
      rating: 4.9,
      students: 987,
      category: "Blockchain",
      thumbnail: "https://img.youtube.com/vi/M576WGiDBdQ/maxresdefault.jpg",
      videoId: VIDEO_ID,
      description: "Learn to build secure smart contracts with Solidity from beginner to advanced.",
    },
    {
      title: "Digital Marketing Strategy",
      creator: "Neil Patel",
      price: "0.005",
      duration: "2h 20m",
      rating: 4.6,
      students: 3421,
      category: "Marketing",
      thumbnail: "https://img.youtube.com/vi/nU-IIXBWlS4/maxresdefault.jpg",
      videoId: "wm5gMKuwSYk",
      description: "Complete digital marketing strategy course covering SEO, social media, and analytics.",
    },
    {
      title: "Figma to Code Workflow",
      creator: "Kevin Powell",
      price: "0.008",
      duration: "1h 55m",
      rating: 4.7,
      students: 1234,
      category: "Design",
      thumbnail: "https://img.youtube.com/vi/KYFdNJum-HE/maxresdefault.jpg",
      videoId: "wm5gMKuwSYk",
      description: "Learn how to efficiently convert Figma designs into production-ready code.",
    },
  ];

  const categories = ["all", "Programming", "Design", "Blockchain", "Marketing"];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
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
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Discover{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Courses</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Browse our library of premium courses. Pay only for the time you spend learning.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/50" />
              <input
                type="text"
                className="w-full bg-black/30 border border-white/20 rounded-2xl pl-12 pr-6 py-4 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20"
                placeholder="Search courses, creators, topics..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4 flex-wrap">
              <div className="relative">
                <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
                <select
                  className="bg-black/30 border border-white/20 rounded-xl pl-10 pr-8 py-3 text-white appearance-none cursor-pointer focus:border-purple-400 focus:outline-none"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-800">
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>

              <select className="bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-purple-400 focus:outline-none">
                <option value="all" className="bg-slate-800">
                  All Prices
                </option>
                <option value="low" className="bg-slate-800">
                  $0.001-0.005/sec
                </option>
                <option value="medium" className="bg-slate-800">
                  $0.005-0.01/sec
                </option>
                <option value="high" className="bg-slate-800">
                  $0.01+/sec
                </option>
              </select>

              <select className="bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:border-purple-400 focus:outline-none">
                <option value="all" className="bg-slate-800">
                  All Durations
                </option>
                <option value="short" className="bg-slate-800">
                  &lt; 2 hours
                </option>
                <option value="medium" className="bg-slate-800">
                  2-4 hours
                </option>
                <option value="long" className="bg-slate-800">
                  4+ hours
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white/70">Showing {filteredCourses.length} courses</div>
          <div className="flex gap-2">
            <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/15 transition-colors">
              Most Popular
            </button>
            <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/15 transition-colors">
              Newest First
            </button>
            <button className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/15 transition-colors">
              Price: Low to High
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course, i) => (
            <Link key={i} href={`/courses/${course.videoId}`}>
              <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all hover:scale-105 cursor-pointer h-full">
                {/* Course Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <PlayIcon className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-white">
                    {course.duration}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-purple-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-semibold">
                    {course.category}
                  </div>

                  {/* Preview Text */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-75">Preview available</div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-grow">{course.description}</p>

                  {/* Creator */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {course.creator[0]}
                    </div>
                    <span className="text-white/70 text-sm">{course.creator}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <div className="flex items-center space-x-3 text-white/60">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span>{course.rating}</span>
                      </div>
                      <span>👥 {course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-purple-400">${course.price}</span>
                      <span className="text-white/60 text-sm">/sec</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all">
                      Watch Now
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-4 rounded-full font-semibold hover:bg-white/15 transition-all">
            Load More Courses
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 mt-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already saving money with our pay-per-second model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses/dpw9EHDh2bM"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
            >
              Try a Free Preview
            </Link>
            <Link
              href="/creators"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Become a Creator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

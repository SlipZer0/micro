"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  CurrencyDollarIcon,
  EyeIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const DashboardPage: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock creator data
  const creatorData = {
    totalEarnings: 2847.32,
    activeStreams: 127,
    totalViewers: 5429,
    watchTime: "1,247h",
    availableBalance: 2847.32,
    todayEarnings: 94.12,
    weekEarnings: 651.8,
    monthEarnings: 2847.32,
  };

  const topCourses = [
    {
      title: "Advanced React Patterns",
      earnings: 1247.8,
      viewers: 1847,
      hours: "4,293h",
      rating: 4.9,
      thumbnail: "https://img.youtube.com/vi/dpw9EHDh2bM/maxresdefault.jpg",
    },
    {
      title: "Next.js Masterclass",
      earnings: 892.15,
      viewers: 1234,
      hours: "2,891h",
      rating: 4.8,
      thumbnail: "https://img.youtube.com/vi/wm5gMKuwSYk/maxresdefault.jpg",
    },
    {
      title: "TypeScript Deep Dive",
      earnings: 654.32,
      viewers: 892,
      hours: "1,847h",
      rating: 4.7,
      thumbnail: "https://img.youtube.com/vi/30LWjhZzg50/maxresdefault.jpg",
    },
  ];

  const recentActivity = [
    { user: "Alice Johnson", course: "React Patterns", amount: 12.45, time: "2m ago", avatar: "A" },
    { user: "Bob Smith", course: "Next.js Guide", amount: 8.23, time: "5m ago", avatar: "B" },
    { user: "Charlie Davis", course: "TypeScript", amount: 15.67, time: "12m ago", avatar: "C" },
    { user: "Diana Wilson", course: "React Patterns", amount: 9.84, time: "18m ago", avatar: "D" },
    { user: "Edward Brown", course: "Next.js Guide", amount: 11.23, time: "25m ago", avatar: "E" },
    { user: "Fiona Miller", course: "TypeScript", amount: 7.45, time: "35m ago", avatar: "F" },
  ];

  const earningsData = [
    { day: "Mon", earnings: 234 },
    { day: "Tue", earnings: 187 },
    { day: "Wed", earnings: 298 },
    { day: "Thu", earnings: 156 },
    { day: "Fri", earnings: 432 },
    { day: "Sat", earnings: 387 },
    { day: "Sun", earnings: 294 },
  ];

  const maxEarnings = Math.max(...earningsData.map(d => d.earnings));

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
              <Link href="/courses" className="text-white/70 hover:text-white transition-colors">
                Courses
              </Link>
              <Link href="/creators" className="text-white/70 hover:text-white transition-colors">
                Creators
              </Link>
              <Link href="/dashboard" className="text-purple-400 font-semibold">
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
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Creator Dashboard</h1>
            <p className="text-xl text-white/70">Track your earnings and course performance</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/courses"
              className="border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center space-x-2"
            >
              <EyeIcon className="w-5 h-5" />
              <span>Browse Courses</span>
            </Link>
            <Link
              href="/dashboard/upload"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Upload Course</span>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-2 max-w-md">
          {[
            { key: "overview", label: "Overview" },
            { key: "courses", label: "My Courses" },
            { key: "analytics", label: "Analytics" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                selectedTab === tab.key
                  ? "bg-white text-purple-900"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {selectedTab === "overview" && (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: "Total Earnings",
                  value: `$${creatorData.totalEarnings.toFixed(2)}`,
                  change: "+12.5%",
                  icon: <CurrencyDollarIcon className="w-8 h-8" />,
                  color: "green",
                  trend: "up",
                },
                {
                  title: "Active Streams",
                  value: creatorData.activeStreams.toString(),
                  change: "+8",
                  icon: <EyeIcon className="w-8 h-8" />,
                  color: "blue",
                  trend: "up",
                },
                {
                  title: "Total Viewers",
                  value: creatorData.totalViewers.toLocaleString(),
                  change: "+24%",
                  icon: <UsersIcon className="w-8 h-8" />,
                  color: "purple",
                  trend: "up",
                },
                {
                  title: "Watch Time",
                  value: creatorData.watchTime,
                  change: "+18%",
                  icon: <ClockIcon className="w-8 h-8" />,
                  color: "pink",
                  trend: "up",
                },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`text-${metric.color}-400 group-hover:scale-110 transition-transform`}>
                      {metric.icon}
                    </div>
                    <div
                      className={`flex items-center space-x-1 text-sm font-semibold px-2 py-1 rounded-full ${
                        metric.trend === "up" ? "bg-green-400/20 text-green-400" : "bg-red-400/20 text-red-400"
                      }`}
                    >
                      <ArrowTrendingUpIcon className="w-3 h-3" />
                      <span>{metric.change}</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.title}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Earnings Chart & Withdrawal */}
              <div className="space-y-8">
                {/* Earnings Overview */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <ArrowTrendingUpIcon className="w-6 h-6 text-green-400" />
                    <span>Weekly Earnings</span>
                  </h3>

                  {/* Simple Bar Chart */}
                  <div className="mb-6">
                    <div className="flex items-end justify-between h-48 space-x-2">
                      {earningsData.map((data, i) => (
                        <div key={i} className="flex flex-col items-center flex-1">
                          <div
                            className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg w-full transition-all hover:scale-105 cursor-pointer relative group"
                            style={{ height: `${(data.earnings / maxEarnings) * 100}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                              ${data.earnings}
                            </div>
                          </div>
                          <div className="text-white/60 text-sm mt-2">{data.day}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-green-400">${creatorData.todayEarnings}</div>
                      <div className="text-sm text-gray-400">Today</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-400">${creatorData.weekEarnings}</div>
                      <div className="text-sm text-gray-400">This Week</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-purple-400">${creatorData.monthEarnings}</div>
                      <div className="text-sm text-gray-400">This Month</div>
                    </div>
                  </div>
                </div>

                {/* Withdrawal Section */}
                <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <CurrencyDollarIcon className="w-8 h-8 text-green-400" />
                    <h3 className="text-2xl font-bold text-white">Available Balance</h3>
                  </div>
                  <div className="text-5xl font-bold text-green-400 mb-4">${creatorData.availableBalance} USDC</div>
                  <p className="text-gray-300 mb-6">Ready to withdraw to your connected wallet</p>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-green-500/25 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                    <ArrowDownTrayIcon className="w-6 h-6" />
                    <span>Withdraw Earnings</span>
                  </button>
                  <div className="text-center text-green-200 text-sm mt-3">
                    Estimated gas fee: $2.34 • Processing time: ~1 minute
                  </div>
                </div>
              </div>

              {/* Right Column - Performance & Activity */}
              <div className="space-y-8">
                {/* Top Performing Courses */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Top Performing Courses</h3>
                  <div className="space-y-4">
                    {topCourses.map((course, i) => (
                      <div
                        key={i}
                        className="bg-black/20 rounded-2xl p-4 hover:bg-black/30 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
                              {course.title}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span>👥 {course.viewers.toLocaleString()} viewers</span>
                              <span>⏱️ {course.hours} watched</span>
                              <span>★ {course.rating}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-400">${course.earnings}</div>
                            <div className="text-sm text-gray-400">earned</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {recentActivity.map((activity, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-black/10 rounded-xl hover:bg-black/20 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                            {activity.avatar}
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">{activity.user}</div>
                            <div className="text-gray-400 text-xs">{activity.course}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-semibold">${activity.amount}</div>
                          <div className="text-gray-400 text-xs">{activity.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedTab === "courses" && (
          <div className="space-y-8">
            {/* Course Management Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">My Courses</h2>
                <p className="text-white/70">Manage your published courses and track performance</p>
              </div>
              <Link
                href="/dashboard/upload"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Upload Course</span>
              </Link>
            </div>

            {/* Published Courses */}
            <div className="grid gap-6">
              {topCourses.map((course, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all"
                >
                  <div className="flex items-start space-x-6">
                    {/* Thumbnail */}
                    <div className="w-32 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                    </div>

                    {/* Course Info */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span>⭐ {course.rating} rating</span>
                            <span>👥 {course.viewers.toLocaleString()} students</span>
                            <span>⏱️ {course.hours} watched</span>
                            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">PUBLISHED</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">${course.earnings}</div>
                          <div className="text-sm text-white/60">total earned</div>
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-4 gap-6 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{Math.floor(course.viewers * 0.15)}</div>
                          <div className="text-xs text-white/50">Active Today</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">${(course.earnings * 0.12).toFixed(0)}</div>
                          <div className="text-xs text-white/50">This Week</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">{Math.floor(course.viewers * 0.08)}</div>
                          <div className="text-xs text-white/50">New Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-pink-400">{Math.floor(Math.random() * 100 + 80)}%</div>
                          <div className="text-xs text-white/50">Completion Rate</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        <Link
                          href={`/courses/${i === 0 ? "dpw9EHDh2bM" : "wm5gMKuwSYk"}`}
                          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2"
                        >
                          <EyeIcon className="w-4 h-4" />
                          <span>View Course</span>
                        </Link>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          📊 Analytics
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                          ⚙️ Settings
                        </button>
                        <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg text-sm transition-colors">
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/dashboard/upload"
                  className="bg-white/10 hover:bg-white/15 rounded-2xl p-6 transition-colors group"
                >
                  <div className="text-4xl mb-4">🎬</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Upload New Course</h4>
                  <p className="text-white/70 text-sm">Create and publish a new course to start earning</p>
                </Link>
                <button className="bg-white/10 hover:bg-white/15 rounded-2xl p-6 transition-colors group text-left">
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-lg font-semibold text-white mb-2">View Analytics</h4>
                  <p className="text-white/70 text-sm">Deep insights into your course performance</p>
                </button>
                <button className="bg-white/10 hover:bg-white/15 rounded-2xl p-6 transition-colors group text-left">
                  <div className="text-4xl mb-4">💬</div>
                  <h4 className="text-lg font-semibold text-white mb-2">Student Feedback</h4>
                  <p className="text-white/70 text-sm">Read reviews and respond to student questions</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "analytics" && (
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
            <div className="text-center py-12">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-white/70 mb-8">
                Detailed insights into your course performance, viewer behavior, and earning patterns
              </p>
              <div className="text-purple-300">Coming Soon - Advanced analytics dashboard</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

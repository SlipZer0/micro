"use client";

import Link from "next/link";
import type { NextPage } from "next";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PlayIcon,
  StarIcon as StarSolidIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const CreatorsPage: NextPage = () => {
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
              <Link href="/creators" className="text-purple-400 font-semibold">
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

      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-7xl md:text-8xl font-bold text-white leading-tight mb-8">
            Become a <span className="gradient-text-purple">Creator</span>
          </h1>

          <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-12">
            Share your knowledge and earn continuously. Get paid per second as students learn from your content.
            <span className="block mt-2 text-purple-300">Fair compensation. Real-time earnings. Global reach.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all transform hover:scale-105 btn-animate"
            >
              Start Creating
            </Link>
            <Link
              href="#how-it-works"
              className="border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 backdrop-blur-md transition-all"
            >
              Learn How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "$84,329", label: "Paid to Creators", icon: "💰" },
              { number: "10,247", label: "Active Learners", icon: "👥" },
              { number: "1,547", label: "Hours Streamed", icon: "⏱️" },
              { number: "156", label: "Live Courses", icon: "📚" },
            ].map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">How FlowLearn Works</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Simple, transparent, and fair. Create content once, earn continuously.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Upload Your Course",
                desc: "Create and upload your course content. Set your per-second rate and preview length.",
                icon: "📹",
                details: ["Video upload & processing", "Course structure setup", "Pricing configuration"],
              },
              {
                step: "2",
                title: "Students Stream & Pay",
                desc: "Learners discover your content and pay per second while watching. No upfront commitments.",
                icon: "💳",
                details: ["Real-time streaming", "Per-second billing", "Automatic payments"],
              },
              {
                step: "3",
                title: "Earn Continuously",
                desc: "Watch your earnings grow in real-time. Withdraw your USDC earnings anytime to your wallet.",
                icon: "💰",
                details: ["Real-time earnings", "Instant withdrawals", "Transparent analytics"],
              },
            ].map((step, i) => (
              <div
                key={i}
                className="glass rounded-3xl p-8 hover:bg-white/15 transition-all animate-scale-in"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {step.step}
                  </div>
                  <div className="text-5xl mb-4">{step.icon}</div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 text-center">{step.title}</h3>
                <p className="text-white/70 text-center mb-6 leading-relaxed">{step.desc}</p>

                <div className="space-y-2">
                  {step.details.map((detail, j) => (
                    <div key={j} className="flex items-center space-x-2 text-sm text-white/60">
                      <CheckIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Why Create on FlowLearn?</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The first platform where your earnings match your content quality and engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CurrencyDollarIcon className="w-12 h-12" />,
                title: "Fair Revenue Model",
                desc: "Earn exactly what your content deserves. Higher engagement = higher earnings.",
                highlight: "Up to 85% revenue share",
              },
              {
                icon: <ClockIcon className="w-12 h-12" />,
                title: "Real-Time Earnings",
                desc: "Watch your earnings grow as students learn. No waiting for monthly payouts.",
                highlight: "Instant visibility",
              },
              {
                icon: <UsersIcon className="w-12 h-12" />,
                title: "Global Audience",
                desc: "Reach learners worldwide with zero platform barriers or geographical restrictions.",
                highlight: "10,000+ active users",
              },
              {
                icon: <PlayIcon className="w-12 h-12" />,
                title: "Quality Content Focus",
                desc: "Students pay for time watched, incentivizing high-quality, engaging content.",
                highlight: "Quality over quantity",
              },
              {
                icon: <StarSolidIcon className="w-12 h-12" />,
                title: "Creator Support",
                desc: "Dedicated support team, marketing assistance, and creator community.",
                highlight: "24/7 creator support",
              },
              {
                icon: <CheckIcon className="w-12 h-12" />,
                title: "Easy Withdrawals",
                desc: "Withdraw your USDC earnings instantly to any wallet. No minimum thresholds.",
                highlight: "Gasless withdrawals",
              },
            ].map((benefit, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:bg-white/15 transition-all course-card">
                <div className="text-purple-300 mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/70 mb-4 leading-relaxed">{benefit.desc}</p>
                <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {benefit.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Creator Success Stories</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See how creators are already earning with FlowLearn&apos;s pay-per-second model.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dan Abramov",
                role: "React Expert",
                earnings: "$3,247",
                course: "Advanced React Patterns",
                avatar: "D",
                quote: "Finally, a platform where my earnings reflect the actual value I provide to students.",
              },
              {
                name: "Sarah Chen",
                role: "UI/UX Designer",
                earnings: "$2,189",
                course: "Design Systems Masterclass",
                avatar: "S",
                quote: "I love seeing my earnings grow in real-time as students engage with my content.",
              },
              {
                name: "Patrick Collins",
                role: "Web3 Developer",
                earnings: "$4,521",
                course: "Solidity Smart Contracts",
                avatar: "P",
                quote: "The pay-per-second model ensures I'm compensated fairly for creating quality content.",
              },
            ].map((creator, i) => (
              <div key={i} className="glass rounded-3xl p-8 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {creator.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-white">{creator.name}</h3>
                  <p className="text-purple-300">{creator.role}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-400 mb-1">{creator.earnings}</div>
                  <div className="text-sm text-white/60">earned this month</div>
                  <div className="text-sm text-white/50 mt-1">from &quot;{creator.course}&quot;</div>
                </div>

                <blockquote className="text-white/80 text-center italic">&quot;{creator.quote}&quot;</blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join the revolution in online education. Create once, earn continuously.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              href="/dashboard"
              className="bg-white text-purple-900 px-12 py-5 rounded-full font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 btn-animate"
            >
              Start Creating Today
            </Link>
            <Link
              href="/courses"
              className="border-2 border-white/30 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-white/10 transition-all"
            >
              Browse Courses First
            </Link>
          </div>

          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">85%</div>
                <div className="text-white/70">Revenue Share</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white/70">Creator Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">$0</div>
                <div className="text-white/70">Platform Fees</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreatorsPage;

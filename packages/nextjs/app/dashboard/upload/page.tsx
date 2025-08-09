"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import {
  ArrowLeftIcon,
  CheckIcon,
  ClockIcon,
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  EyeIcon,
  PlayIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

const UploadPage: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    pricePerSecond: "",
    duration: "",
    thumbnail: null as File | null,
    videoFile: null as File | null,
    previewLength: 900, // 15 minutes in seconds
    learningOutcomes: ["", "", "", ""],
    curriculum: [{ title: "", duration: "", free: true }],
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const categories = ["Programming", "Design", "Blockchain", "Marketing", "Business", "Data Science"];

  const handleInputChange = (field: string, value: any) => {
    if (field === "previewLength") {
      setFormData(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleLearningOutcomeChange = (index: number, value: string) => {
    const newOutcomes = [...formData.learningOutcomes];
    newOutcomes[index] = value;
    setFormData(prev => ({ ...prev, learningOutcomes: newOutcomes }));
  };

  const addCurriculumItem = () => {
    setFormData(prev => ({
      ...prev,
      curriculum: [...prev.curriculum, { title: "", duration: "", free: false }],
    }));
  };

  const handleCurriculumChange = (index: number, field: string, value: any) => {
    const newCurriculum = [...formData.curriculum];
    newCurriculum[index] = { ...newCurriculum[index], [field]: value };
    setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const handleSubmit = () => {
    simulateUpload();
  };

  const steps = [
    { number: 1, title: "Basic Info", desc: "Course details" },
    { number: 2, title: "Content", desc: "Video & materials" },
    { number: 3, title: "Pricing", desc: "Set your rates" },
    { number: 4, title: "Curriculum", desc: "Structure lessons" },
    { number: 5, title: "Review", desc: "Final check" },
  ];

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
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/dashboard" className="text-white/70 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-white">Upload New Course</h1>
            <p className="text-white/70 mt-2">Share your knowledge and start earning per second</p>
          </div>
        </div>

        {uploadComplete ? (
          /* Success Screen */
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-xl border border-green-500/20 rounded-3xl p-12 text-center">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckIcon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Course Published Successfully!</h2>
              <p className="text-green-200 mb-8">
                Your course &quot;{formData.title}&quot; is now live and available for students to discover.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-black/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Course Details</h3>
                  <div className="space-y-2 text-sm text-green-200">
                    <div>💰 ${formData.pricePerSecond}/second</div>
                    <div>⏱️ {formData.duration} duration</div>
                    <div>📚 {formData.category}</div>
                    <div>🎬 {formData.previewLength / 60} min free preview</div>
                  </div>
                </div>
                <div className="bg-black/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">What&apos;s Next</h3>
                  <div className="space-y-2 text-sm text-green-200">
                    <div>✅ Course processing complete</div>
                    <div>✅ Thumbnail uploaded</div>
                    <div>✅ Listed in course catalog</div>
                    <div>✅ Ready for student enrollment</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/courses"
                  className="bg-white text-green-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
                >
                  <EyeIcon className="w-5 h-5" />
                  <span>View in Catalog</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="border-2 border-green-400 text-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-400/10 transition-colors"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center">
                    <div
                      className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-all ${
                        currentStep >= step.number ? "bg-purple-500 text-white" : "text-white/60"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          currentStep >= step.number ? "bg-white text-purple-500" : "bg-white/20"
                        }`}
                      >
                        {step.number}
                      </div>
                      <div className="hidden md:block">
                        <div className="text-sm font-semibold">{step.title}</div>
                        <div className="text-xs opacity-75">{step.desc}</div>
                      </div>
                    </div>
                    {i < steps.length - 1 && <div className="w-8 h-px bg-white/20 mx-2"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden">
                {/* Step 1: Basic Info */}
                {currentStep === 1 && (
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-8">
                      <DocumentIcon className="w-8 h-8 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">Course Information</h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-white font-semibold mb-2">Course Title *</label>
                        <input
                          type="text"
                          className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                          placeholder="e.g., Advanced React Patterns"
                          value={formData.title}
                          onChange={e => handleInputChange("title", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">Short Description *</label>
                        <textarea
                          className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none h-24 resize-none"
                          placeholder="Brief description that appears in course listings"
                          value={formData.description}
                          onChange={e => handleInputChange("description", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">Detailed Description *</label>
                        <textarea
                          className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none h-32 resize-none"
                          placeholder="Comprehensive course description with what students will learn"
                          value={formData.longDescription}
                          onChange={e => handleInputChange("longDescription", e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">Category *</label>
                        <select
                          className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                          value={formData.category}
                          onChange={e => handleInputChange("category", e.target.value)}
                        >
                          <option value="" className="bg-slate-800">
                            Select a category
                          </option>
                          {categories.map(cat => (
                            <option key={cat} value={cat} className="bg-slate-800">
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">Learning Outcomes</label>
                        <div className="space-y-3">
                          {formData.learningOutcomes.map((outcome, i) => (
                            <input
                              key={i}
                              type="text"
                              className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                              placeholder={`Learning outcome ${i + 1}`}
                              value={outcome}
                              onChange={e => handleLearningOutcomeChange(i, e.target.value)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Content */}
                {currentStep === 2 && (
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-8">
                      <VideoCameraIcon className="w-8 h-8 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">Course Content</h2>
                    </div>

                    <div className="space-y-8">
                      {/* Video Upload */}
                      <div>
                        <label className="block text-white font-semibold mb-4">Course Video *</label>
                        <div className="border-2 border-dashed border-white/30 rounded-2xl p-12 text-center hover:border-purple-400 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            id="video-upload"
                            onChange={e => e.target.files && handleFileUpload("videoFile", e.target.files[0])}
                          />
                          <label htmlFor="video-upload" className="cursor-pointer">
                            <CloudArrowUpIcon className="w-16 h-16 text-white/50 mx-auto mb-4" />
                            {formData.videoFile ? (
                              <div>
                                <p className="text-green-400 font-semibold mb-2">✅ {formData.videoFile.name}</p>
                                <p className="text-white/70 text-sm">Click to replace video</p>
                              </div>
                            ) : (
                              <div>
                                <p className="text-white mb-2">Click to upload your course video</p>
                                <p className="text-white/50 text-sm">MP4, MOV, AVI up to 5GB</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Thumbnail Upload */}
                      <div>
                        <label className="block text-white font-semibold mb-4">Course Thumbnail *</label>
                        <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="thumbnail-upload"
                            onChange={e => e.target.files && handleFileUpload("thumbnail", e.target.files[0])}
                          />
                          <label htmlFor="thumbnail-upload" className="cursor-pointer">
                            {formData.thumbnail ? (
                              <div>
                                <p className="text-green-400 font-semibold mb-2">✅ {formData.thumbnail.name}</p>
                                <p className="text-white/70 text-sm">Click to replace thumbnail</p>
                              </div>
                            ) : (
                              <div>
                                <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                  📸
                                </div>
                                <p className="text-white mb-2">Upload course thumbnail</p>
                                <p className="text-white/50 text-sm">JPG, PNG (recommended: 1280x720)</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Duration */}
                      <div>
                        <label className="block text-white font-semibold mb-2">Video Duration *</label>
                        <input
                          type="text"
                          className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                          placeholder="e.g., 2h 15m"
                          value={formData.duration}
                          onChange={e => handleInputChange("duration", e.target.value)}
                        />
                        <p className="text-white/50 text-sm mt-2">Enter the total duration of your course video</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Pricing */}
                {currentStep === 3 && (
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-8">
                      <CurrencyDollarIcon className="w-8 h-8 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">Pricing & Preview</h2>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <label className="block text-white font-semibold mb-2">Price Per Second (USDC) *</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">$</span>
                          <input
                            type="number"
                            step="0.001"
                            className="w-full bg-black/30 border border-white/20 rounded-xl pl-8 pr-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                            placeholder="0.008"
                            value={formData.pricePerSecond}
                            onChange={e => handleInputChange("pricePerSecond", e.target.value)}
                          />
                        </div>
                        <p className="text-white/50 text-sm mt-2">
                          Students pay this amount for each second they watch
                        </p>
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">Free Preview Length</label>
                        <select
                          className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-400 focus:outline-none"
                          value={formData.previewLength}
                          onChange={e => handleInputChange("previewLength", e.target.value)}
                        >
                          <option value="300" className="bg-slate-800">
                            5 minutes
                          </option>
                          <option value="600" className="bg-slate-800">
                            10 minutes
                          </option>
                          <option value="900" className="bg-slate-800">
                            15 minutes
                          </option>
                          <option value="1800" className="bg-slate-800">
                            30 minutes
                          </option>
                        </select>
                        <p className="text-white/50 text-sm mt-2">
                          How much of your course students can watch for free
                        </p>
                      </div>

                      {/* Pricing Calculator */}
                      {formData.pricePerSecond && formData.duration && (
                        <div className="bg-black/20 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-white mb-4">Estimated Pricing</h3>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-400">
                                ${(parseFloat(formData.pricePerSecond) * 600).toFixed(2)}
                              </div>
                              <div className="text-white/60 text-sm">10 minutes</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-400">
                                ${(parseFloat(formData.pricePerSecond) * 1800).toFixed(2)}
                              </div>
                              <div className="text-white/60 text-sm">30 minutes</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-400">
                                ${(parseFloat(formData.pricePerSecond) * 3600).toFixed(2)}
                              </div>
                              <div className="text-white/60 text-sm">1 hour</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 4: Curriculum */}
                {currentStep === 4 && (
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-8">
                      <ClockIcon className="w-8 h-8 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">Course Curriculum</h2>
                    </div>

                    <div className="space-y-6">
                      {formData.curriculum.map((item, i) => (
                        <div key={i} className="bg-black/20 rounded-2xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Lesson {i + 1}</h3>
                            {i === 0 && (
                              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                                FREE PREVIEW
                              </span>
                            )}
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-white/70 mb-2">Lesson Title</label>
                              <input
                                type="text"
                                className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                                placeholder="e.g., Introduction to Hooks"
                                value={item.title}
                                onChange={e => handleCurriculumChange(i, "title", e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="block text-white/70 mb-2">Duration</label>
                              <input
                                type="text"
                                className="w-full bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none"
                                placeholder="e.g., 15:30"
                                value={item.duration}
                                onChange={e => handleCurriculumChange(i, "duration", e.target.value)}
                              />
                            </div>
                          </div>

                          {i > 0 && (
                            <div className="mt-4">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  className="rounded border-white/20"
                                  checked={item.free}
                                  onChange={e => handleCurriculumChange(i, "free", e.target.checked)}
                                />
                                <span className="text-white/70">Include in free preview</span>
                              </label>
                            </div>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={addCurriculumItem}
                        className="w-full border-2 border-dashed border-white/30 rounded-2xl p-6 text-white/70 hover:border-purple-400 hover:text-white transition-colors"
                      >
                        + Add Another Lesson
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-8">
                      <CheckIcon className="w-8 h-8 text-purple-400" />
                      <h2 className="text-2xl font-bold text-white">Review & Publish</h2>
                    </div>

                    <div className="space-y-8">
                      {/* Course Preview */}
                      <div className="bg-black/20 rounded-2xl overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center text-white">
                              <PlayIcon className="w-16 h-16 mx-auto mb-4" />
                              <p className="text-lg font-semibold">{formData.title}</p>
                              <p className="text-purple-200">Course Preview</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-white mb-2">{formData.title}</h3>
                          <p className="text-white/70 mb-4">{formData.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-white/60">
                              <span>📚 {formData.category}</span>
                              <span>⏱️ {formData.duration}</span>
                              <span>🎬 {formData.previewLength / 60} min preview</span>
                            </div>
                            <div className="text-xl font-bold text-purple-400">${formData.pricePerSecond}/sec</div>
                          </div>
                        </div>
                      </div>

                      {/* Upload Summary */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white">Content</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Video File:</span>
                              <span className="text-white">{formData.videoFile ? "✅ Uploaded" : "❌ Missing"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Thumbnail:</span>
                              <span className="text-white">{formData.thumbnail ? "✅ Uploaded" : "❌ Missing"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Curriculum:</span>
                              <span className="text-white">{formData.curriculum.length} lessons</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-white">Settings</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Price:</span>
                              <span className="text-green-400">${formData.pricePerSecond}/second</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Category:</span>
                              <span className="text-white">{formData.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Preview:</span>
                              <span className="text-white">{formData.previewLength / 60} minutes</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="bg-purple-900/20 border border-purple-500/20 rounded-2xl p-6">
                        <h4 className="text-lg font-semibold text-white mb-4">Publishing Terms</h4>
                        <div className="space-y-3 text-sm text-white/70">
                          <label className="flex items-start space-x-3">
                            <input type="checkbox" className="mt-1" required />
                            <span>
                              I confirm that I own all rights to this content and have permission to distribute it on
                              FlowLearn.
                            </span>
                          </label>
                          <label className="flex items-start space-x-3">
                            <input type="checkbox" className="mt-1" required />
                            <span>I understand that FlowLearn will take a 15% platform fee from my earnings.</span>
                          </label>
                          <label className="flex items-start space-x-3">
                            <input type="checkbox" className="mt-1" required />
                            <span>I agree to FlowLearn&apos;s Creator Terms of Service and Community Guidelines.</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Progress */}
                {isUploading && (
                  <div className="p-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CloudArrowUpIcon className="w-8 h-8 text-white animate-pulse" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-4">Publishing Your Course</h2>
                      <p className="text-white/70 mb-8">
                        Please don&apos;t close this page while we process your course
                      </p>

                      <div className="max-w-md mx-auto">
                        <div className="bg-black/30 rounded-full h-3 mb-4">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-white font-mono">{Math.round(uploadProgress)}% Complete</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {!isUploading && !uploadComplete && (
                  <div className="border-t border-white/10 p-6 flex justify-between">
                    <button
                      onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                      disabled={currentStep === 1}
                      className={`px-6 py-3 rounded-xl font-semibold transition-colors ${
                        currentStep === 1
                          ? "bg-white/10 text-white/50 cursor-not-allowed"
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                    >
                      Previous
                    </button>

                    {currentStep < 5 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                      >
                        <CloudArrowUpIcon className="w-5 h-5" />
                        <span>Publish Course</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadPage;

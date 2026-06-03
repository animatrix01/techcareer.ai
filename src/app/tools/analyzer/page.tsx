"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  FileUp, Lock, Sparkles, CheckCircle2, 
  AlertCircle, Zap, Target, Shield, Brain,
  Upload, BarChart3, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalyzerStore } from "@/stores/useAnalyzerStore";
import { parseResumeFile, validateResumeText } from "@/lib/utils/file-parser";
import { AIPrinterMachine } from "@/components/analyzer/AIPrinterMachine";
import { FloatingParticles } from "@/components/analyzer/FloatingParticles";
import { AnalysisResults } from "@/components/analyzer/AnalysisResults";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function PremiumAnalyzerPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const setFileName = useAnalyzerStore((state) => state.setFileName);
  const setResumeText = useAnalyzerStore((state) => state.setResumeText);
  const setIsScanning = useAnalyzerStore((state) => state.setIsScanning);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Mouse follow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSelectedFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    
    if (file.size > MAX_SIZE) {
      setUploadError("File size must be under 5MB");
      return;
    }

    const validTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf'
    ];
    
    if (!validTypes.includes(file.type)) {
      setUploadError("Please upload a PDF or DOCX file");
      return;
    }

    setUploadError("");
    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const extractedText = await parseResumeFile(file);
      const validation = validateResumeText(extractedText);
      
      if (!validation.valid) {
        setUploadError(validation.error || "Invalid file content");
        setIsProcessing(false);
        clearInterval(progressInterval);
        return;
      }

      setUploadProgress(100);
      setFileName(file.name);
      setResumeText(extractedText);
      setIsScanning(true);

      // Show results after animation
      setTimeout(() => {
        setShowResults(true);
      }, 2000);

    } catch (error) {
      clearInterval(progressInterval);
      setUploadError(
        error instanceof Error
          ? error.message
          : "Failed to read file. Please try again."
      );
      setIsProcessing(false);
    }
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleSelectedFiles(event.dataTransfer.files);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-violet-50" />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 50%)`
          }}
        />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <FloatingParticles />

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(e) => handleSelectedFiles(e.target.files)}
      />

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                
                {/* LEFT SIDE - Content */}
                <motion.div
                  style={{ opacity, scale }}
                  className="space-y-8"
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-200/50 backdrop-blur-sm"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm font-semibold text-cyan-700">AI-Powered Analysis</span>
                  </motion.div>

                  {/* Headline */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                      Get your resume
                      <br />
                      <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 bg-clip-text text-transparent">
                        ATS score
                      </span>
                    </h1>
                    <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                      Upload your resume and get instant AI-powered feedback. 
                      Know exactly what recruiters and ATS systems see.
                    </p>
                  </motion.div>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-3 gap-6"
                  >
                    {[
                      { icon: Zap, label: "Instant", value: "< 30s" },
                      { icon: Shield, label: "Secure", value: "100%" },
                      { icon: Target, label: "Accuracy", value: "94%" }
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-slate-200/50 shadow-lg">
                          <stat.icon className="w-5 h-5 text-cyan-600 mb-2" />
                          <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                          <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Upload Area */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div
                      role="button"
                      tabIndex={0}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => !isProcessing && inputRef.current?.click()}
                      onKeyDown={(e) => {
                        if ((e.key === "Enter" || e.key === " ") && !isProcessing) {
                          e.preventDefault();
                          inputRef.current?.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={onDrop}
                      className={`relative overflow-hidden cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300 ${
                        isDragging
                          ? "border-cyan-500 bg-cyan-50/50 shadow-2xl shadow-cyan-500/20"
                          : "border-slate-300 bg-white/60 hover:border-cyan-400 hover:bg-white/80 hover:shadow-xl"
                      } ${isProcessing ? "pointer-events-none" : ""}`}
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5" />
                      
                      <div className="relative p-12 text-center">
                        <motion.div
                          animate={isDragging ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                          transition={{ duration: 0.3 }}
                          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 mb-6"
                        >
                          <FileUp className="w-10 h-10" />
                        </motion.div>

                        {!isProcessing ? (
                          <>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                              Drop your resume here
                            </h3>
                            <p className="text-slate-600 mb-6">
                              or click to browse • PDF or DOCX • Max 5MB
                            </p>
                            <Button
                              size="lg"
                              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 px-8"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Choose File
                            </Button>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="inline-flex items-center gap-3 text-cyan-600"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              >
                                <Brain className="w-8 h-8" />
                              </motion.div>
                              <span className="text-lg font-semibold">Analyzing with AI...</span>
                            </motion.div>
                            
                            {/* Progress bar */}
                            <div className="w-full max-w-md mx-auto">
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${uploadProgress}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              </div>
                              <p className="text-sm text-slate-500 mt-2">{uploadProgress}% complete</p>
                            </div>
                          </div>
                        )}

                        {uploadError && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 flex items-center justify-center gap-2 text-red-600"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">{uploadError}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Privacy badge */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-center gap-2 mt-4 text-sm text-slate-500"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Your resume is private and secure</span>
                    </motion.div>
                  </motion.div>

                  {/* Features list */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid sm:grid-cols-2 gap-4"
                  >
                    {[
                      { icon: CheckCircle2, text: "ATS compatibility check" },
                      { icon: Target, text: "Keyword optimization" },
                      { icon: BarChart3, text: "Readability score" },
                      { icon: Award, text: "Industry benchmarks" }
                    ].map((feature, i) => (
                      <motion.div
                        key={feature.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        className="flex items-center gap-3 text-slate-700"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center">
                          <feature.icon className="w-4 h-4 text-cyan-600" />
                        </div>
                        <span className="text-sm font-medium">{feature.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* RIGHT SIDE - 3D Printer Machine */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <AIPrinterMachine isProcessing={isProcessing} progress={uploadProgress} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <AnalysisResults />
        )}
      </AnimatePresence>
    </div>
  );
}

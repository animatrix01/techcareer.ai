"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle, CheckCircle2, XCircle, Info,
  Target, FileText, Zap, Award, ArrowRight, Download,
  RefreshCw, Sparkles, Shield, Clock, TrendingUp,
  ChevronDown, ChevronUp, Eye, BarChart3, Gauge,
  CheckCheck, Loader2
} from "lucide-react";
import { useAnalyzerStore } from "@/stores/useAnalyzerStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AnalysisResults() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showCards, setShowCards] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  const [aiFixing, setAiFixing] = useState<string | null>(null);
  
  const fileName = useAnalyzerStore((state) => state.fileName);
  const resumeText = useAnalyzerStore((state) => state.resumeText);
  const setAnalysisResult = useAnalyzerStore((state) => state.setAnalysisResult);
  const score = useAnalyzerStore((state) => state.score);
  const issues = useAnalyzerStore((state) => state.issues);

  useEffect(() => {
    const analyzeResume = async () => {
      if (!resumeText) return;

      try {
        const response = await fetch("/api/ai/analyzer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText })
        });

        const data = await response.json();
        
        if (data.ok && data.analysis) {
          setAnalysisResult(data.analysis);
        }
      } catch (error) {
        console.error("Analysis failed:", error);
      } finally {
        setTimeout(() => {
          setIsAnalyzing(false);
          setTimeout(() => {
            setShowCards(true);
            setShowInsights(true);
          }, 300);
        }, 2000);
      }
    };

    analyzeResume();
  }, [resumeText, setAnalysisResult]);

  // Animate score counting
  useEffect(() => {
    if (!isAnalyzing && score > 0) {
      let current = 0;
      const increment = score / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          setAnimatedScore(score);
          clearInterval(timer);
        } else {
          setAnimatedScore(Math.floor(current));
        }
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isAnalyzing, score]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return { from: "from-emerald-500", to: "to-teal-600", text: "text-emerald-600", glow: "shadow-emerald-500/50" };
    if (score >= 60) return { from: "from-amber-500", to: "to-orange-600", text: "text-amber-600", glow: "shadow-amber-500/50" };
    return { from: "from-red-500", to: "to-rose-600", text: "text-red-600", glow: "shadow-red-500/50" };
  };

  const scoreColor = getScoreColor(score);
  const atsCompatibility = Math.min(100, score + 10);

  const insights = [
    { label: score >= 70 ? "Strong formatting" : "Needs formatting", positive: score >= 70 },
    { label: issues.filter(i => i.category === "impact").length === 0 ? "Good metrics" : "Needs better metrics", positive: issues.filter(i => i.category === "impact").length === 0 },
    { label: score >= 60 ? "Good readability" : "Improve readability", positive: score >= 60 },
    { label: issues.filter(i => i.category === "wording").length <= 2 ? "Strong wording" : "Weak action verbs", positive: issues.filter(i => i.category === "wording").length <= 2 }
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return XCircle;
      case "warning": return AlertCircle;
      case "info": return Info;
      default: return CheckCircle2;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-600 bg-red-50 border-red-200";
      case "warning": return "text-amber-600 bg-amber-50 border-amber-200";
      case "info": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-emerald-600 bg-emerald-50 border-emerald-200";
    }
  };

  if (isAnalyzing) {
    const steps = [
      { label: "Scanned", delay: 0 },
      { label: "Parsed", delay: 0.5 },
      { label: "ATS Compared", delay: 1 },
      { label: "Recruiter Simulation", delay: 1.5 }
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
        </div>

        <div className="relative text-center space-y-8 z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-600 text-white shadow-2xl shadow-cyan-500/50"
          >
            <Sparkles className="w-10 h-10" />
          </motion.div>
          
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-3">AI Analysis in Progress</h3>
            <p className="text-slate-600 text-lg">Our AI is reviewing every detail of your resume</p>
          </div>

          {/* Analysis steps timeline */}
          <div className="space-y-3 max-w-md mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay, duration: 0.4 }}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-200/50 shadow-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step.delay + 0.2, type: "spring" }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-600 flex items-center justify-center"
                >
                  <CheckCheck className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-sm font-medium text-slate-700">{step.label}</span>
                <motion.div
                  className="ml-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4 text-cyan-600" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-200/50 mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-700">Analysis Complete</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Your Resume Score
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {fileName || "Your resume"} has been analyzed by our AI
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-3xl blur-3xl" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/50 shadow-2xl p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Score Circle */}
              <div className="flex justify-center">
                <div className="relative">
                  <svg className="w-64 h-64 -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="16"
                    />
                    <motion.circle
                      cx="128"
                      cy="128"
                      r="120"
                      fill="none"
                      stroke="url(#scoreGradient)"
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 120}
                      initial={{ strokeDashoffset: 2 * Math.PI * 120 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 120 * (1 - score / 100) }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, type: "spring" }}
                        className="text-7xl font-extrabold bg-gradient-to-br from-cyan-600 to-emerald-600 bg-clip-text text-transparent"
                      >
                        {animatedScore}
                      </motion.div>
                      <div className="text-slate-500 font-medium">out of 100</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Target, label: "ATS Ready", value: score >= 70 ? "Yes" : "Needs Work", color: score >= 70 ? "text-emerald-600" : "text-amber-600" },
                    { icon: FileText, label: "Issues Found", value: issues.length, color: "text-slate-700" },
                    { icon: Shield, label: "Format", value: "Good", color: "text-emerald-600" },
                    { icon: Clock, label: "Read Time", value: "45s", color: "text-slate-700" }
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
                    >
                      <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    size="lg"
                    className="flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white shadow-lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-slate-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Issues Section */}
        <AnimatePresence>
          {showCards && issues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Issues & Recommendations</h2>
              <div className="grid gap-4">
                {issues.map((issue, i) => {
                  const Icon = getSeverityIcon(issue.severity);
                  return (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.01, x: 4 }}
                      className={`bg-white rounded-2xl border p-6 shadow-sm hover:shadow-lg transition-all ${getSeverityColor(issue.severity)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold mb-2">{issue.title}</h3>
                          <p className="text-sm mb-3 opacity-90">{issue.whyItMatters}</p>
                          <div className="bg-white/50 rounded-xl p-4 border border-current/10">
                            <p className="text-sm font-medium mb-1">💡 Suggestion:</p>
                            <p className="text-sm opacity-90">{issue.suggestedImprovement}</p>
                          </div>
                        </div>
                        {issue.canAIFix && (
                          <Link href="/tools/builder">
                            <Button
                              size="sm"
                              className="flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-600 text-white hover:from-cyan-600 hover:to-emerald-700"
                            >
                              <Zap className="w-3 h-3 mr-1" />
                              AI Fix
                            </Button>
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-slate-200/50 shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-600 text-white shadow-lg shadow-cyan-500/30 mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to build your perfect resume?</h3>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg">
                Use our AI-powered resume builder to create an ATS-optimized resume in minutes
              </p>
              <Link href="/tools/builder">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-emerald-600 hover:from-cyan-600 hover:to-emerald-700 text-white shadow-xl shadow-cyan-500/30 px-8 h-14 text-base"
                >
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

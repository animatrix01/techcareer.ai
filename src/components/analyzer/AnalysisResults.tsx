"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle, CheckCircle2, XCircle, Info,
  Target, FileText, Zap, Award, ArrowRight, Download,
  RefreshCw, Sparkles, Shield, Clock, CheckCheck, Loader2
} from "lucide-react";
import { useAnalyzerStore } from "@/stores/useAnalyzerStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AnalysisResults() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [showCards, setShowCards] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

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
          body: JSON.stringify({ resumeText }),
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
          setTimeout(() => setShowCards(true), 300);
        }, 2000);
      }
    };
    analyzeResume();
  }, [resumeText, setAnalysisResult]);

  // Animate score counter
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

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return XCircle;
      case "warning": return AlertCircle;
      case "info": return Info;
      default: return CheckCircle2;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "critical": return { card: "border-red-200 bg-red-50/50", icon: "text-red-500", badge: "bg-red-100 text-red-700" };
      case "warning": return { card: "border-amber-200 bg-amber-50/50", icon: "text-amber-500", badge: "bg-amber-100 text-amber-700" };
      case "info": return { card: "border-blue-200 bg-blue-50/50", icon: "text-blue-500", badge: "bg-blue-100 text-blue-700" };
      default: return { card: "border-emerald-200 bg-emerald-50/50", icon: "text-emerald-500", badge: "bg-emerald-100 text-emerald-700" };
    }
  };

  const getScoreLabel = (s: number) => {
    if (s >= 80) return { label: "Excellent", color: "text-emerald-600", ring: "#10b981" };
    if (s >= 60) return { label: "Good", color: "text-amber-600", ring: "#f59e0b" };
    return { label: "Needs Work", color: "text-red-500", ring: "#ef4444" };
  };

  const scoreInfo = getScoreLabel(score);

  // Loading state
  if (isAnalyzing) {
    const steps = [
      { label: "Parsing resume content", delay: 0 },
      { label: "Running ATS checks", delay: 0.6 },
      { label: "Analyzing impact & wording", delay: 1.2 },
      { label: "Generating recommendations", delay: 1.8 },
    ];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center space-y-8 max-w-md mx-auto px-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo to-indigo/80 text-white shadow-soft mx-auto"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-ink mb-2">AI Analysis in Progress</h3>
            <p className="text-muted-foreground">Reviewing every detail of your resume</p>
          </div>

          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.delay, duration: 0.4 }}
                className="tile flex items-center gap-3 p-4 text-left"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step.delay + 0.2, type: "spring" }}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo flex items-center justify-center"
                >
                  <CheckCheck className="w-3.5 h-3.5 text-white" />
                </motion.div>
                <span className="text-sm font-medium text-ink">{step.label}</span>
                <motion.div
                  className="ml-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-4 h-4 text-indigo" />
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
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo/10 border border-indigo/20 mb-4"
          >
            <CheckCircle2 className="w-4 h-4 text-indigo" />
            <span className="text-sm font-medium text-indigo">Analysis Complete</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-ink mb-3">Your Resume Score</h1>
          <p className="text-muted-foreground text-lg">{fileName || "Your resume"} has been analyzed by our AI</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="tile p-8 sm:p-10 mb-8"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Score Circle */}
            <div className="flex justify-center">
              <div className="relative">
                <svg className="w-56 h-56 -rotate-90">
                  <circle cx="112" cy="112" r="100" fill="none" stroke="#e2e8f0" strokeWidth="14" />
                  <motion.circle
                    cx="112"
                    cy="112"
                    r="100"
                    fill="none"
                    stroke={scoreInfo.ring}
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 100}
                    initial={{ strokeDashoffset: 2 * Math.PI * 100 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 100 * (1 - score / 100) }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      className={`text-6xl font-bold ${scoreInfo.color}`}
                    >
                      {animatedScore}
                    </motion.div>
                    <div className="text-muted-foreground text-sm font-medium">out of 100</div>
                    <div className={`text-sm font-semibold mt-1 ${scoreInfo.color}`}>{scoreInfo.label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-ink mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Target, label: "ATS Ready", value: score >= 70 ? "Yes" : "Needs Work", color: score >= 70 ? "text-emerald-600" : "text-amber-600" },
                  { icon: FileText, label: "Issues Found", value: issues.length, color: "text-ink" },
                  { icon: Shield, label: "Format", value: "Good", color: "text-emerald-600" },
                  { icon: Clock, label: "Read Time", value: "45s", color: "text-ink" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="tile p-4"
                  >
                    <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Button size="lg" className="flex-1 btn-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button size="lg" variant="outline" className="border-border">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Issues */}
        <AnimatePresence>
          {showCards && issues.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-serif font-bold text-ink mb-5">Issues & Recommendations</h2>
              <div className="grid gap-4">
                {issues.map((issue, i) => {
                  const Icon = getSeverityIcon(issue.severity);
                  const style = getSeverityStyle(issue.severity);
                  return (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className={`tile border ${style.card} p-5`}
                    >
                      <div className="flex items-start gap-4">
                        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${style.icon}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-ink">{issue.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${style.badge}`}>
                              {issue.severity}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{issue.whyItMatters}</p>
                          <div className="bg-paper/60 rounded-xl p-3 border border-border/50">
                            <p className="text-xs font-semibold text-ink mb-1">💡 Suggestion</p>
                            <p className="text-sm text-muted-foreground">{issue.suggestedImprovement}</p>
                          </div>
                        </div>
                        {issue.canAIFix && (
                          <Link href="/tools/builder">
                            <Button size="sm" className="flex-shrink-0 bg-indigo hover:bg-indigo/90 text-white">
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-14 tile p-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo to-indigo/80 text-white shadow-soft mb-5">
            <Award className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-ink mb-3">Ready to build your perfect resume?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Use our AI-powered resume builder to create an ATS-optimized resume in minutes
          </p>
          <Link href="/tools/builder">
            <Button size="lg" className="btn-primary px-8 h-12">
              Start Building
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

"use client";

import { create } from "zustand";
import type {
  ResumeAnalysisResult,
  ResumeIssue,
  IssueCategory,
} from "@/lib/llm/schemas";

type AnalyzerStore = {
  fileName: string | null;
  isScanning: boolean;
  score: number;
  feedback: string[]; // Deprecated: kept for backward compatibility
  issues: ResumeIssue[];
  categorySummary: Record<IssueCategory, number> | null;
  resumeText: string | null;
  setFileName: (fileName: string | null) => void;
  setIsScanning: (isScanning: boolean) => void;
  setScore: (score: number) => void;
  setFeedback: (feedback: string[]) => void; // Deprecated: kept for backward compatibility
  setAnalysisResult: (result: ResumeAnalysisResult) => void;
  setResumeText: (text: string | null) => void;
  resetAnalyzer: () => void;
};

export const useAnalyzerStore = create<AnalyzerStore>((set) => ({
  fileName: null,
  isScanning: false,
  score: 0,
  feedback: [], // Deprecated
  issues: [],
  categorySummary: null,
  resumeText: null,
  setFileName: (fileName) => set({ fileName }),
  setIsScanning: (isScanning) => set({ isScanning }),
  setScore: (score) => set({ score }),
  setFeedback: (feedback) => set({ feedback }), // Deprecated
  setAnalysisResult: (result) =>
    set({
      score: result.score,
      issues: result.issues,
      categorySummary: result.categorySummary,
    }),
  setResumeText: (text) => set({ resumeText: text }),
  resetAnalyzer: () =>
    set({
      fileName: null,
      isScanning: false,
      score: 0,
      feedback: [],
      issues: [],
      categorySummary: null,
      resumeText: null,
    }),
}));

"use client";

import { create } from "zustand";

type AnalyzerStore = {
  fileName: string | null;
  isScanning: boolean;
  score: number;
  feedback: string[];
  setFileName: (fileName: string | null) => void;
  setIsScanning: (isScanning: boolean) => void;
  setScore: (score: number) => void;
  setFeedback: (feedback: string[]) => void;
  resetAnalyzer: () => void;
};

export const useAnalyzerStore = create<AnalyzerStore>((set) => ({
  fileName: null,
  isScanning: false,
  score: 0,
  feedback: [],
  setFileName: (fileName) => set({ fileName }),
  setIsScanning: (isScanning) => set({ isScanning }),
  setScore: (score) => set({ score }),
  setFeedback: (feedback) => set({ feedback }),
  resetAnalyzer: () =>
    set({
      fileName: null,
      isScanning: false,
      score: 0,
      feedback: [],
    }),
}));

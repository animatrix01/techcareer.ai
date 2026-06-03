"use client";

import { create } from "zustand";

import type { RoadmapPhase } from "@/lib/llm/schemas";

export type { RoadmapPhase };

interface RoadmapStoreState {
  targetRole: string | null;
  currentSkills: string[];
  roadmapData: RoadmapPhase[] | null;
  fullRoadmapResult: import("@/lib/llm/schemas").RoadmapGenerationResult | null;
  savedRoadmapId: string | null;
}

interface RoadmapStoreActions {
  setTargetRole: (role: string | null) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setRoadmapData: (data: RoadmapPhase[] | null) => void;
  setFullRoadmapResult: (result: import("@/lib/llm/schemas").RoadmapGenerationResult | null) => void;
  setSavedRoadmapId: (id: string | null) => void;
  resetRoadmap: () => void;
}

type RoadmapStore = RoadmapStoreState & RoadmapStoreActions;

const initialState: RoadmapStoreState = {
  targetRole: null,
  currentSkills: [],
  roadmapData: null,
  fullRoadmapResult: null,
  savedRoadmapId: null,
};

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  ...initialState,
  setTargetRole: (role) => set({ targetRole: role }),
  addSkill: (skill) =>
    set((state) => {
      const trimmedSkill = skill.trim();
      if (trimmedSkill.length === 0 || state.currentSkills.includes(trimmedSkill)) {
        return state;
      }
      return { currentSkills: [...state.currentSkills, trimmedSkill] };
    }),
  removeSkill: (skill) =>
    set((state) => ({
      currentSkills: state.currentSkills.filter((existingSkill) => existingSkill !== skill),
    })),
  setRoadmapData: (data) => set({ roadmapData: data }),
  setFullRoadmapResult: (result) => set({ fullRoadmapResult: result }),
  setSavedRoadmapId: (id) => set({ savedRoadmapId: id }),
  resetRoadmap: () => set({ ...initialState }),
}));

"use client";

import { create } from "zustand";

export interface RoadmapPhase {
  id: number;
  title: string;
  duration: string;
  description: string;
  skills: string[];
  actionItems: string[];
}

interface RoadmapStoreState {
  targetRole: string | null;
  currentSkills: string[];
  roadmapData: RoadmapPhase[] | null;
}

interface RoadmapStoreActions {
  setTargetRole: (role: string | null) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setRoadmapData: (data: RoadmapPhase[] | null) => void;
  resetRoadmap: () => void;
}

type RoadmapStore = RoadmapStoreState & RoadmapStoreActions;

const initialState: RoadmapStoreState = {
  targetRole: null,
  currentSkills: [],
  roadmapData: null,
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

      return {
        currentSkills: [...state.currentSkills, trimmedSkill],
      };
    }),
  removeSkill: (skill) =>
    set((state) => ({
      currentSkills: state.currentSkills.filter((existingSkill) => existingSkill !== skill),
    })),
  setRoadmapData: (data) => set({ roadmapData: data }),
  resetRoadmap: () =>
    set({
      ...initialState,
    }),
}));

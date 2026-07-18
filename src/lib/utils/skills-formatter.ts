import type { CategorizedSkills } from "@/stores/useBuilderStore";

/**
 * Converts categorized skills object into a flat array of skill strings
 * for display in resume templates.
 * 
 * @param skills - The categorized skills object or legacy string format
 * @returns Array of skill strings
 */
export function formatSkillsForTemplate(skills: CategorizedSkills | string): string[] {
  // Handle legacy string format (backward compatibility)
  if (typeof skills === 'string') {
    return skills
      .split(/[,•\n]/g)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  
  // Handle new categorized format
  if (typeof skills === 'object' && skills !== null) {
    const allSkills: string[] = [];
    
    // Extract skills from all categories
    const categories: Array<keyof CategorizedSkills> = [
      'programming',
      'frameworks',
      'databases',
      'cloud',
      'devops',
      'tools',
      'softSkills',
      'languages',
    ];
    
    categories.forEach((category) => {
      if (skills[category] && Array.isArray(skills[category])) {
        allSkills.push(...skills[category]);
      }
    });
    
    return allSkills.filter(Boolean);
  }
  
  // Fallback for unexpected format
  return [];
}

/**
 * Legacy function name for backward compatibility
 * @deprecated Use formatSkillsForTemplate instead
 */
export function skillTokens(skills: CategorizedSkills | string): string[] {
  return formatSkillsForTemplate(skills);
}

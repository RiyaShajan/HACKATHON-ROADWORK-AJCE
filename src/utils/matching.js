import { SKILLS } from "../data/questions";

export const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

export function jaccardPct(selected, target) {
  if (!target.length) return 0;
  const setA = new Set(selected);
  const inter = target.filter((t) => setA.has(t)).length;
  const union = new Set([...selected, ...target]).size;
  return union === 0 ? 0 : (inter / target.length) * 100 * 0.7 + (inter / union) * 100 * 0.3;
}

export function buildProfile(answers) {
  const interests = answers.interests || [];
  const subjects = answers.subjects || [];
  const skills = answers.strengths || answers.skills || [];

  const subjectTraitMap = {
    "Computer Science": { Technology: 2, "Problem Solving": 1 },
    Math: { "Problem Solving": 2 },
    Physics: { "Problem Solving": 1, Technology: 1 },
    Biology: { Communication: 0 },
    Chemistry: { "Problem Solving": 1 },
    Art: { Creativity: 2 },
    "Business Studies": { Communication: 1 },
    Languages: { Communication: 2 },
    "Social Studies": { Communication: 1 },
  };

  const traits = { Technology: 0, "Problem Solving": 0, Creativity: 0, Communication: 0 };
  const maxTraits = { Technology: 0, "Problem Solving": 0, Creativity: 0, Communication: 0 };

  Object.keys(traits).forEach((t) => {
    if (interests.includes(t)) traits[t] += 3;
    maxTraits[t] += 3;
    if (
      skills.includes(t) ||
      (t === "Technology" &&
        (skills.includes("Programming") || skills.includes("Computer Basics")))
    ) {
      traits[t] += 3;
    }
    maxTraits[t] += 3;
  });

  subjects.forEach((s) => {
    const m = subjectTraitMap[s] || {};
    Object.entries(m).forEach(([t, v]) => {
      traits[t] += v;
    });
  });
  Object.keys(traits).forEach((t) => (maxTraits[t] += 2));

  const traitPct = {};
  Object.keys(traits).forEach((t) => {
    traitPct[t] = clamp(Math.round((traits[t] / Math.max(1, maxTraits[t])) * 100));
  });

  const skillPct = {};
  SKILLS.forEach((s) => {
    skillPct[s] = skills.includes(s) ? 85 : 30;
  });

  const hands =
    answers.workStyle === "Working outdoors" || answers.workStyle === "Building things"
      ? "High"
      : "Medium";
      
  const budgetLabel = (answers.budget || "").includes("income")
    ? "High Income Focus"
    : (answers.budget || "").includes("stability")
    ? "Stability Focus"
    : "Balanced";

  return {
    traits: traitPct,
    skills: skillPct,
    preferences: {
      "Hands-on Work": hands,
      "Core Value": budgetLabel,
    },
  };
}

export function scoreCareer(career, answers, allCareers) {
  const interests = answers.interests || [];
  const skills = answers.strengths || answers.skills || [];

  const interestMatch = clamp(jaccardPct(interests, career.interestCategories));
  const skillMatch = clamp(jaccardPct(skills, career.requiredSkills));
  const localDemand = career.localDemand;

  const maxSalary = Math.max(...allCareers.map((c) => (c.salaryRange[0] + c.salaryRange[1]) / 2));
  const avgSalary = (career.salaryRange[0] + career.salaryRange[1]) / 2;
  const salaryPotential = clamp((avgSalary / maxSalary) * 100);

  const budgetLow = (answers.budget || "").includes("stability");
  const prefSkill = answers.pathwayPref === "Certification / skill-first";
  const prefDegree = answers.pathwayPref === "Traditional degree";
  let accessibility = career.accessibilityBase;
  if (budgetLow || prefSkill) accessibility = clamp(accessibility + 8);
  if (prefDegree) accessibility = clamp(accessibility - 4);

  const final =
    interestMatch * 0.35 +
    skillMatch * 0.25 +
    localDemand * 0.2 +
    salaryPotential * 0.1 +
    accessibility * 0.1;

  return {
    career,
    final: Math.round(clamp(final)),
    breakdown: {
      interestMatch: Math.round(interestMatch),
      skillMatch: Math.round(skillMatch),
      localDemand: Math.round(localDemand),
      salaryPotential: Math.round(salaryPotential),
      accessibility: Math.round(accessibility),
    },
  };
}

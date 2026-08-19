import express from "express";

const app = express();
const port = 3000;

const projects = [
  {
    id: 1,
    title: "Build a responsive marketing website",
    description: "Create a fast, accessible marketing site from the provided designs.",
    category: "Web Development",
    experienceLevel: "Intermediate",
    projectType: "Fixed price",
    budget: 1800,
    skills: ["Vue.js", "CSS", "Accessibility"],
    postedAt: "2026-04-18",
  },
  {
    id: 2,
    title: "Create a Node.js reporting API",
    description: "Develop REST endpoints that aggregate sales data for an internal dashboard.",
    category: "Backend Development",
    experienceLevel: "Expert",
    projectType: "Fixed price",
    budget: 3200,
    skills: ["Node.js", "Express", "PostgreSQL"],
    postedAt: "2026-04-17",
  },
  {
    id: 3,
    title: "Improve an ecommerce checkout experience",
    description: "Refine the checkout flow and implement the updated interface in Vue.",
    category: "Web Development",
    experienceLevel: "Expert",
    projectType: "Hourly",
    budget: 2400,
    skills: ["Vue.js", "JavaScript", "UX"],
    postedAt: "2026-04-16",
  },
  {
    id: 4,
    title: "Design a mobile application prototype",
    description: "Turn product requirements into a polished, testable mobile prototype.",
    category: "Design",
    experienceLevel: "Intermediate",
    projectType: "Fixed price",
    budget: 1500,
    skills: ["Figma", "Prototyping", "User Research"],
    postedAt: "2026-04-15",
  },
  {
    id: 5,
    title: "Write onboarding content for a SaaS product",
    description: "Create concise onboarding emails and in-product guidance for new customers.",
    category: "Writing",
    experienceLevel: "Entry level",
    projectType: "Fixed price",
    budget: 600,
    skills: ["Copywriting", "SaaS", "Email"],
    postedAt: "2026-04-14",
  },
  {
    id: 6,
    title: "Build an analytics dashboard",
    description: "Implement dashboard views and reusable charts for product analytics data.",
    category: "Web Development",
    experienceLevel: "Intermediate",
    projectType: "Hourly",
    budget: 2800,
    skills: ["Vue.js", "Data Visualization", "REST APIs"],
    postedAt: "2026-04-13",
  },
];

const categories = new Set(["Web Development", "Backend Development", "Design", "Writing"]);
const experienceLevels = new Set(["Entry level", "Intermediate", "Expert"]);
const projectTypes = new Set(["Fixed price", "Hourly"]);

app.get("/api/projects", (request, response) => {
  const query = String(request.query.q || "")
    .trim()
    .toLowerCase();
  const category = categories.has(request.query.category) ? request.query.category : "";
  const experienceLevel = experienceLevels.has(request.query.experienceLevel) ? request.query.experienceLevel : "";
  const projectType = projectTypes.has(request.query.projectType) ? request.query.projectType : "";
  const minBudgetValue = String(request.query.minBudget ?? "").trim();
  const parsedMinBudget = Number(minBudgetValue);
  const minBudget = minBudgetValue && Number.isFinite(parsedMinBudget) && parsedMinBudget >= 0 ? parsedMinBudget : null;

  const matches = projects.filter((project) => {
    const searchableText = [project.title, project.description, project.category, ...project.skills].join(" ").toLowerCase();

    return (
      (!query || searchableText.includes(query)) &&
      (!category || project.category === category) &&
      (!experienceLevel || project.experienceLevel === experienceLevel) &&
      (!projectType || project.projectType === projectType) &&
      (minBudget === null || (project.projectType === "Fixed price" && project.budget >= minBudget))
    );
  });

  response.json(matches);
});

app.listen(port, () => {
  console.log(`WorkMatch API listening on http://localhost:${port}`);
});

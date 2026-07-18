import type { ResumeBuilderData } from "@/stores/useBuilderStore";

// ─── Shared helpers ───────────────────────────────────────────────────────────

const make = (
  fullName: string,
  jobTitle: string,
  email: string,
  phone: string,
  location: string,
  summary: string,
  skills: ResumeBuilderData["skills"],
  experience: ResumeBuilderData["experience"],
  education: ResumeBuilderData["education"],
  projects: ResumeBuilderData["projects"],
): ResumeBuilderData => ({
  basics: { fullName, jobTitle, email, phone, location, summary },
  skills,
  experience,
  education,
  projects,
  certifications: [],
});

// ─── Shared sub-data ─────────────────────────────────────────────────────────

const twoJobs = (role1: string, co1: string, role2: string, co2: string): ResumeBuilderData["experience"] => [
  {
    id: "1", company: co1, role: role1, companyWebsite: "", location: "San Francisco, CA",
    employmentType: "full-time", workMode: "hybrid", startDate: "2021-03", endDate: "",
    currentlyWorking: true,
    description: `<ul><li>Led development of core platform features serving 200k+ monthly active users across web and mobile surfaces, collaborating closely with product and design</li><li>Architected and delivered a microservices migration reducing average API latency from 480ms to 95ms — a 5× improvement enabling the company to hit SLA targets</li><li>Designed and implemented automated CI/CD pipelines cutting release cycle from 2 weeks to 2 days and reducing production incidents by 60%</li><li>Mentored 4 junior engineers through structured 1:1s, code reviews, and design sessions; two received promotions within the year</li></ul>`,
    achievements: "Reduced infrastructure costs by $180k annually through spot instance optimization and unused resource cleanup. Named internal Tech Lead of the Quarter.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"], teamSize: "8", projectName: "", client: "", industry: "SaaS",
  },
  {
    id: "2", company: co2, role: role2, companyWebsite: "", location: "Remote",
    employmentType: "full-time", workMode: "remote", startDate: "2018-06", endDate: "2021-02",
    currentlyWorking: false,
    description: `<ul><li>Built and shipped 3 major product features — notifications engine, activity feed, and onboarding flow — adopted by 50k+ users within the first month</li><li>Improved core API response time by 40% through database query optimization, connection pooling, and strategic caching layer introduction</li><li>Collaborated with cross-functional teams across design, data, and mobile to define technical requirements and deliver milestones on schedule</li><li>Wrote comprehensive unit and integration test suite raising coverage from 42% to 91%, eliminating entire classes of regression bugs</li></ul>`,
    achievements: "Promoted to tech lead within 18 months. Led post-mortems that reduced P1 incident recurrence by 75%.",
    technologies: ["Vue.js", "Python", "MySQL", "Redis", "Docker"], teamSize: "5", projectName: "", client: "", industry: "Technology",
  },
];

const oneEdu = (degree: string, institution: string, city: string, gpa?: string): ResumeBuilderData["education"] => [
  {
    id: "1", institution, degree, fieldOfStudy: "Computer Science", city,
    startDate: "2014-09", endDate: "2018-05", currentlyStudying: false,
    gpa: gpa || "3.8",
    description: "Dean's List all semesters. Relevant coursework: Data Structures & Algorithms, Operating Systems, Database Systems, Distributed Computing, Software Engineering. Teaching Assistant for Algorithms (2017).",
  },
];

const oneProject = (name: string, stack: string): ResumeBuilderData["projects"] => [
  {
    id: "1", name, role: "Creator & Maintainer", techStack: stack,
    githubUrl: "https://github.com/sample/project", liveUrl: "https://project.dev",
    startDate: "2022-01", endDate: "2023-06",
    description: "Open-source developer tool with 2,400+ GitHub stars and 500+ weekly active users across 40 countries. Built as a side project to solve a real pain point in the ecosystem.",
    achievements: "Featured in GitHub Trending for 3 consecutive days. Reached 10k npm downloads within first 3 months. Integrated by 4 Fortune 500 companies.",
  },
  {
    id: "2", name: "PersonalSite", role: "Developer", techStack: "Next.js, Tailwind CSS, Vercel",
    githubUrl: "https://github.com/sample/personalsite", liveUrl: "https://mysite.dev",
    startDate: "2023-01", endDate: "2023-03",
    description: "Personal portfolio and blog with custom CMS, dark mode, and sub-100ms load times globally via edge deployment.",
    achievements: "99/100 Lighthouse performance score. 2k+ monthly visitors.",
  },
];

// ─── 20 unique American profiles ─────────────────────────────────────────────

// 1. modern — Senior Software Engineer
const modernProfile = make(
  "James Carter", "Senior Software Engineer", "james.carter@email.com", "+1 415 555 0192", "San Francisco, CA",
  "Senior software engineer with 7+ years building scalable web applications and distributed systems. Passionate about clean architecture, developer experience, and leading high-impact engineering teams. Proven track record shipping products from 0 to 1 and scaling them to millions of users.",
  { programming: ["TypeScript", "Python", "Go", "Java"], frameworks: ["React", "Node.js", "Next.js", "GraphQL"], databases: ["PostgreSQL", "Redis", "MongoDB"], cloud: ["AWS", "GCP", "Docker", "Kubernetes"], devops: ["CI/CD", "Terraform", "GitHub Actions"], tools: ["Figma", "Linear", "Datadog"], softSkills: ["Technical Leadership", "Mentoring"], languages: ["English"] },
  twoJobs("Senior Software Engineer", "Stripe", "Software Engineer", "Lyft"),
  oneEdu("B.S. Computer Science", "UC Berkeley", "Berkeley, CA", "3.9"),
  oneProject("FlowMetrics", "Go, Prometheus, React, PostgreSQL"),
);

// 2. classic — Marketing Director
const classicProfile = make(
  "Emily Harrington", "Marketing Director", "emily.harrington@email.com", "+1 212 555 0348", "New York, NY",
  "Results-driven marketing director with 10+ years driving brand growth and revenue for Fortune 500 companies. Led campaigns generating $120M+ in pipeline. Expert in digital strategy, content marketing, demand generation, and building high-performing creative teams. MBA from Northwestern Kellogg.",
  { programming: [], frameworks: [], databases: [], cloud: [], devops: [], tools: ["HubSpot", "Salesforce", "Marketo", "Google Analytics", "Tableau", "Figma"], softSkills: ["Executive Leadership", "Brand Strategy", "Team Building", "Stakeholder Management"], languages: ["English", "French"] },
  twoJobs("Marketing Director", "Verizon", "Sr. Marketing Manager", "Nielsen"),
  oneEdu("M.B.A. Marketing", "Northwestern University (Kellogg)", "Evanston, IL"),
  oneProject("CampaignOS", "HubSpot API, React, Salesforce"),
);

// 3. executive — Chief Technology Officer
const executiveProfile = make(
  "Robert Whitfield", "Chief Technology Officer", "r.whitfield@email.com", "+1 650 555 0215", "Palo Alto, CA",
  "Visionary CTO with 15+ years scaling engineering organizations from 10 to 300+ engineers. Delivered 4 successful IPOs and managed $200M+ technology budgets. Deep expertise in distributed systems, cloud architecture, and building engineering culture. Board advisor to 3 Series B startups.",
  { programming: ["Python", "Go", "Java", "SQL"], frameworks: ["gRPC", "Spring Boot"], databases: ["PostgreSQL", "Cassandra", "Redis"], cloud: ["AWS", "GCP", "Azure"], devops: ["Kubernetes", "Terraform", "CI/CD"], tools: ["Jira", "Confluence", "Datadog"], softSkills: ["Executive Leadership", "Org Scaling", "Technical Vision", "Hiring"], languages: ["English"] },
  twoJobs("Chief Technology Officer", "Palantir", "VP of Engineering", "Salesforce"),
  oneEdu("M.S. Computer Science", "Stanford University", "Stanford, CA", "4.0"),
  oneProject("InfraScale", "Terraform, Kubernetes, Go, Prometheus"),
);

// 4. innovator — Product Manager
const innovatorProfile = make(
  "Samantha Brooks", "Senior Product Manager", "sam.brooks@email.com", "+1 206 555 0174", "Seattle, WA",
  "Strategic product manager with 6+ years turning complex customer problems into elegant, high-impact products. Shipped 12+ major features used by 5M+ users at Amazon and Twilio. Strong data intuition, deep customer empathy, and experience driving 0-to-1 product development from discovery through launch.",
  { programming: ["SQL", "Python"], frameworks: [], databases: [], cloud: [], devops: [], tools: ["Jira", "Figma", "Amplitude", "Mixpanel", "Notion", "Looker"], softSkills: ["Product Strategy", "Cross-functional Leadership", "User Research", "Roadmapping"], languages: ["English", "Spanish"] },
  twoJobs("Senior Product Manager", "Amazon", "Product Manager", "Twilio"),
  oneEdu("B.S. Business Administration", "University of Washington", "Seattle, WA"),
  oneProject("ProductPulse", "React, SQL, Amplitude, Figma"),
);

// 5. minimalist — Data Scientist
const minimalistProfile = make(
  "Nathan Pierce", "Senior Data Scientist", "n.pierce@email.com", "+1 617 555 0291", "Boston, MA",
  "Data scientist specializing in NLP, forecasting, and production ML systems. Published 3 peer-reviewed papers at NeurIPS and EMNLP. 5+ years building ML pipelines that directly drive business outcomes — from fraud detection to personalization engines serving 10M+ users daily.",
  { programming: ["Python", "R", "SQL", "Scala"], frameworks: ["PyTorch", "TensorFlow", "scikit-learn", "Spark", "dbt"], databases: ["PostgreSQL", "MongoDB", "Snowflake"], cloud: ["AWS", "SageMaker", "Databricks"], devops: ["Docker", "Airflow"], tools: ["Jupyter", "Tableau", "MLflow"], softSkills: ["Research Communication", "Stakeholder Collaboration"], languages: ["English"] },
  twoJobs("Senior Data Scientist", "HubSpot", "Data Scientist", "Wayfair"),
  oneEdu("M.S. Statistics & ML", "MIT", "Cambridge, MA", "3.95"),
  oneProject("SentimentGraph", "Python, PyTorch, FastAPI, PostgreSQL"),
);

// 6. ats-minimal — Software Engineer
const atsMinimalProfile = make(
  "Jessica Morgan", "Software Engineer", "jessica.morgan@email.com", "+1 512 555 0188", "Austin, TX",
  "Full-stack software engineer with 4+ years delivering reliable, high-quality web applications. Experienced across the entire development lifecycle from architecture decisions to deployment. Strong advocate for test-driven development, clean code, and accessible UI. Previously led a team of 3 at HomeAway.",
  { programming: ["JavaScript", "TypeScript", "Python"], frameworks: ["React", "Express", "Next.js", "Jest"], databases: ["PostgreSQL", "Redis"], cloud: ["AWS", "Vercel"], devops: ["Docker", "GitHub Actions", "CI/CD"], tools: ["VS Code", "Linear"], softSkills: [], languages: [] },
  twoJobs("Software Engineer", "Indeed", "Junior Developer", "HomeAway"),
  oneEdu("B.S. Computer Science", "University of Texas at Austin", "Austin, TX", "3.7"),
  oneProject("QuickAPI", "Node.js, TypeScript, PostgreSQL, Redis"),
);

// 7. ats-compact — DevOps Engineer
const atsCompactProfile = make(
  "Marcus Johnson", "Senior DevOps Engineer", "marcus.johnson@email.com", "+1 303 555 0267", "Denver, CO",
  "Senior DevOps engineer with 5+ years building and owning cloud infrastructure for high-growth SaaS companies. Reduced deployment frequency from weekly to 50+ deploys/day. Expert in Kubernetes, Terraform, and GitOps workflows. Strong background in SRE practices and on-call runbooks.",
  { programming: ["Python", "Bash", "Go"], frameworks: [], databases: ["PostgreSQL", "MySQL"], cloud: ["AWS", "GCP", "Azure"], devops: ["Kubernetes", "Terraform", "Jenkins", "Docker", "Helm", "Ansible"], tools: ["Datadog", "PagerDuty", "Grafana"], softSkills: ["Incident Management", "On-call Leadership"], languages: [] },
  twoJobs("Senior DevOps Engineer", "SendGrid", "Cloud Engineer", "Ping Identity"),
  oneEdu("B.S. Information Technology", "Colorado State University", "Fort Collins, CO", "3.6"),
  oneProject("PipelineKit", "Python, Terraform, GitHub Actions, AWS"),
);

// 8. startup-bold — Full Stack Developer
const startupBoldProfile = make(
  "Tyler Anderson", "Full Stack Developer", "tyler.anderson@email.com", "+1 415 555 0344", "San Jose, CA",
  "Full-stack developer obsessed with fast shipping, clean code, and great user experiences. 5 years building 0-to-1 products at Series A–C startups. Comfortable owning an entire product surface area solo or leading a squad of 10. Strong opinions on TypeScript, testing, and developer tooling.",
  { programming: ["TypeScript", "Python", "JavaScript"], frameworks: ["Next.js", "FastAPI", "React", "tRPC"], databases: ["PostgreSQL", "Redis", "Supabase"], cloud: ["Vercel", "AWS", "Railway"], devops: ["Docker", "GitHub Actions"], tools: ["Linear", "Figma", "Notion"], softSkills: ["Ownership Mentality", "Fast Iteration"], languages: [] },
  twoJobs("Full Stack Developer", "Rippling", "Software Engineer", "Brex"),
  oneEdu("B.S. Computer Science", "San Jose State University", "San Jose, CA", "3.6"),
  oneProject("ShipKit", "Next.js, TypeScript, Stripe, PostgreSQL"),
);

// 9. creative-sidebar — UX Designer
const creativeSidebarProfile = make(
  "Olivia Bennett", "Senior UX Designer", "olivia.bennett@email.com", "+1 323 555 0219", "Los Angeles, CA",
  "Senior UX designer with 6+ years crafting intuitive digital products for consumer apps and enterprise platforms. Design systems advocate who shipped the first cohesive design system at Snap. Previously led design at two Y Combinator startups from 0 to Series B. Passionate about accessibility and inclusive design.",
  { programming: [], frameworks: [], databases: [], cloud: [], devops: [], tools: ["Figma", "Principle", "Maze", "Zeplin", "Framer", "Storybook", "Hotjar"], softSkills: ["User Research", "Storytelling", "Design Critique", "Stakeholder Alignment"], languages: ["English", "French"] },
  twoJobs("Senior UX Designer", "Snap Inc.", "UX Designer", "VSCO"),
  oneEdu("B.F.A. Interaction Design", "ArtCenter College of Design", "Pasadena, CA"),
  oneProject("DesignOS", "Figma, Storybook, React, Chromatic"),
);

// 10. professional-clean — Financial Analyst
const professionalCleanProfile = make(
  "Catherine Walsh", "Senior Financial Analyst", "c.walsh@email.com", "+1 212 555 0338", "New York, NY",
  "CFA charterholder with 8+ years in investment banking, M&A advisory, and corporate FP&A. Closed $2B+ in transactions. Expert financial modeler with deep experience in LBO, DCF, and comparable company analysis. Strong communicator who translates complex financial data into executive-ready narratives.",
  { programming: ["Python", "SQL", "VBA", "R"], frameworks: [], databases: [], cloud: [], devops: [], tools: ["Bloomberg Terminal", "FactSet", "Excel", "Tableau", "PowerPoint", "Argus"], softSkills: ["Executive Presentation", "Stakeholder Management", "Analytical Thinking"], languages: ["English", "Spanish"] },
  twoJobs("Senior Financial Analyst", "Goldman Sachs", "Financial Analyst", "JPMorgan Chase"),
  oneEdu("B.S. Finance", "New York University (Stern)", "New York, NY", "3.8"),
  oneProject("ValuationModel", "Python, Excel, Pandas, openpyxl"),
);

// 11. tech-focused — Backend Engineer
const techFocusedProfile = make(
  "Daniel Rivera", "Senior Backend Engineer", "daniel.rivera@email.com", "+1 408 555 0172", "San Jose, CA",
  "Backend engineer specializing in high-throughput distributed systems and API infrastructure. Designed and maintained APIs handling 10M+ requests/day at Cloudflare with 99.99% uptime. Go and Rust expert. Deeply familiar with systems-level performance optimization, database internals, and reliable service design.",
  { programming: ["Go", "Rust", "Python", "C++"], frameworks: ["gRPC", "FastAPI", "Gin"], databases: ["PostgreSQL", "Cassandra", "Redis", "ClickHouse"], cloud: ["AWS", "Cloudflare Workers", "GCP"], devops: ["Kubernetes", "Docker", "Terraform", "Prometheus"], tools: ["Grafana", "DataDog", "PagerDuty"], softSkills: ["Systems Design", "Technical Documentation"], languages: [] },
  twoJobs("Senior Backend Engineer", "Cloudflare", "Backend Engineer", "Fastly"),
  oneEdu("B.S. Computer Engineering", "Santa Clara University", "Santa Clara, CA", "3.8"),
  oneProject("EdgeRouter", "Go, gRPC, Redis, Kubernetes"),
);

// 12. designer-split — Brand Designer
const designerSplitProfile = make(
  "Megan Foster", "Senior Brand Designer", "megan.foster@email.com", "+1 213 555 0291", "Los Angeles, CA",
  "Senior brand designer with 5+ years building cohesive visual identities for tech companies, consumer brands, and global NGOs. Led rebrands for 3 companies that resulted in measurable improvements in brand recall and conversion. Strong collaborator who works closely with marketing and product to ensure design consistency at scale.",
  { programming: [], frameworks: [], databases: [], cloud: [], devops: [], tools: ["Figma", "Adobe Illustrator", "Photoshop", "After Effects", "InDesign", "Framer"], softSkills: ["Creative Direction", "Stakeholder Presentations", "Brand Strategy", "Team Leadership"], languages: ["English"] },
  twoJobs("Senior Brand Designer", "Notion", "Brand Designer", "Headspace"),
  oneEdu("B.F.A. Graphic Design", "California Institute of the Arts", "Valencia, CA"),
  oneProject("BrandVault", "Figma, React, Storybook, CSS"),
);

// 13. ats-elegant — Consulting Manager
const atsElegantProfile = make(
  "William Clarke", "Consulting Manager", "william.clarke@email.com", "+1 312 555 0185", "Chicago, IL",
  "Management consulting manager with 9+ years at McKinsey and Accenture leading high-stakes digital transformation engagements. Managed teams of up to 15 consultants. Clients include 3 Fortune 50 CEOs. Deep expertise in operating model design, data strategy, and change management across healthcare, retail, and financial services.",
  { programming: ["SQL", "Python", "R"], frameworks: [], databases: [], cloud: [], devops: [], tools: ["PowerPoint", "Tableau", "Excel", "Miro", "Salesforce", "Looker"], softSkills: ["Strategic Thinking", "Executive Communication", "Team Leadership", "Client Management", "Workshop Facilitation"], languages: ["English", "Spanish"] },
  twoJobs("Consulting Manager", "McKinsey & Company", "Senior Consultant", "Accenture"),
  oneEdu("M.B.A.", "University of Chicago (Booth)", "Chicago, IL", "3.9"),
  oneProject("TransformHub", "Python, Tableau, SQL, Snowflake"),
);

// 14. gradient-pro — Mobile Developer
const gradientProProfile = make(
  "Ashley Turner", "Senior iOS Developer", "ashley.turner@email.com", "+1 310 555 0241", "Los Angeles, CA",
  "Senior iOS developer with 6+ years shipping polished, high-performance apps with millions of downloads on the App Store. SwiftUI and UIKit expert with strong eye for interaction design and animations. Experience owning the full mobile stack — from API contract design through App Store submission and post-launch monitoring.",
  { programming: ["Swift", "Objective-C", "Python", "Kotlin"], frameworks: ["SwiftUI", "UIKit", "Combine", "CoreML", "AVFoundation"], databases: ["Core Data", "Firebase", "Realm"], cloud: ["AWS Amplify", "Firebase"], devops: ["Fastlane", "Bitrise", "TestFlight", "Xcode Cloud"], tools: ["Xcode", "Instruments", "Charles Proxy", "Figma"], softSkills: [], languages: [] },
  twoJobs("Senior iOS Developer", "Spotify", "iOS Developer", "Hinge"),
  oneEdu("B.S. Computer Science", "UCLA", "Los Angeles, CA", "3.7"),
  oneProject("SwiftChart", "Swift, SwiftUI, Charts, WidgetKit"),
);

// 15. executive-luxe — VP of Engineering
const executiveLuxeProfile = make(
  "Michael Donovan", "VP of Engineering", "m.donovan@email.com", "+1 617 555 0158", "Boston, MA",
  "Engineering executive with 12+ years scaling high-performing teams and mission-critical platforms. Grew engineering org from 15 to 120 engineers across 4 offices. Deep background in distributed systems, platform engineering, and cloud-native architecture. Track record of cutting time-to-market by 50%+ through investment in developer tooling and process.",
  { programming: ["Java", "Go", "Python", "TypeScript"], frameworks: ["Spring Boot", "gRPC", "Micronaut"], databases: ["PostgreSQL", "Kafka", "Redis", "Cassandra"], cloud: ["AWS", "GCP"], devops: ["Kubernetes", "Terraform", "Helm", "ArgoCD"], tools: ["Datadog", "PagerDuty", "Jira", "Confluence"], softSkills: ["Engineering Leadership", "Org Scaling", "Hiring & Retention", "Executive Communication"], languages: [] },
  twoJobs("VP of Engineering", "Toast", "Director of Engineering", "Wayfair"),
  oneEdu("M.S. Software Engineering", "Boston University", "Boston, MA", "3.9"),
  oneProject("PlatformCore", "Java, Kafka, Kubernetes, Terraform"),
);

// 16. creative-portfolio — Creative Director
const creativePortfolioProfile = make(
  "Lauren Mitchell", "Creative Director", "lauren.mitchell@email.com", "+1 212 555 0347", "New York, NY",
  "Creative director with 10+ years leading award-winning integrated campaigns for global brands including Nike, Apple, and LVMH. Deep expertise in brand strategy, motion design, content production, and building world-class in-house creative teams. Won 6 Cannes Lions and 3 Clio Awards. Driven by the intersection of culture, technology, and storytelling.",
  { programming: [], frameworks: [], databases: [], cloud: [], devops: [], tools: ["Figma", "After Effects", "Cinema 4D", "Premiere Pro", "Photoshop", "DaVinci Resolve", "Notion"], softSkills: ["Creative Direction", "Brand Strategy", "Team Leadership", "Pitching & Presentations", "Cross-functional Collaboration"], languages: ["English", "French"] },
  twoJobs("Creative Director", "Huge Inc.", "Art Director", "Wieden+Kennedy"),
  oneEdu("B.F.A. Advertising Design", "School of Visual Arts", "New York, NY"),
  oneProject("MotionLib", "After Effects, Cinema 4D, React, GSAP"),
);

// 17. developer-dark — Security Engineer
const developerDarkProfile = make(
  "Jason Mercer", "Senior Security Engineer", "jason.mercer@email.com", "+1 703 555 0213", "Arlington, VA",
  "Senior security engineer with 6+ years specializing in application security, red team operations, and zero-trust architecture. Cleared TS/SCI. Built internal security automation tooling now used across 8 federal agencies. Discovered and responsibly disclosed 14 CVEs. Committed to making security a developer-friendly practice rather than a gate.",
  { programming: ["Python", "Go", "Bash", "Rust", "C"], frameworks: ["OWASP ASVS", "NIST"], databases: ["PostgreSQL", "Elasticsearch"], cloud: ["AWS GovCloud", "Azure Government"], devops: ["Docker", "Kubernetes", "Terraform"], tools: ["Burp Suite Pro", "Metasploit", "Nmap", "Wireshark", "Semgrep", "Snyk"], softSkills: ["Threat Modeling", "Security Advocacy", "Technical Documentation"], languages: [] },
  twoJobs("Senior Security Engineer", "Booz Allen Hamilton", "Security Engineer", "MITRE"),
  oneEdu("B.S. Cybersecurity", "George Mason University", "Fairfax, VA", "3.8"),
  oneProject("ThreatScan", "Python, Go, Docker, Elasticsearch"),
);

// 18. fresher-edge — Recent Graduate
const fresherEdgeProfile = make(
  "Ethan Caldwell", "Software Engineer", "ethan.caldwell@email.com", "+1 919 555 0167", "Raleigh, NC",
  "Computer Science graduate with a strong foundation in full-stack development, algorithms, and software design patterns. Completed 2 software engineering internships at Red Hat and IBM. Built and shipped 5 personal projects with real users. Quick learner who thrives in collaborative, fast-paced environments. Actively seeking a full-time SWE role.",
  { programming: ["JavaScript", "TypeScript", "Python", "Java"], frameworks: ["React", "Next.js", "Spring Boot", "Express"], databases: ["PostgreSQL", "MongoDB"], cloud: ["AWS", "Vercel"], devops: ["Docker", "GitHub Actions"], tools: ["VS Code", "Postman", "Figma"], softSkills: ["Problem Solving", "Team Collaboration"], languages: [] },
  [
    {
      id: "1", company: "Red Hat", role: "Software Engineer Intern", companyWebsite: "", location: "Raleigh, NC",
      employmentType: "internship", workMode: "hybrid", startDate: "2023-05", endDate: "2023-08",
      currentlyWorking: false,
      description: `<ul><li>Built a React dashboard used by 200+ internal engineers to visualize CI/CD pipeline performance and identify build bottlenecks in real time</li><li>Reduced build failure diagnosis time by 30% by surfacing actionable metrics from Jenkins and GitHub Actions APIs</li><li>Collaborated with senior engineers on code reviews and architecture discussions; received return offer</li></ul>`,
      achievements: "Received full-time return offer. Recognized in team standup for delivering ahead of schedule.",
      technologies: ["React", "Python", "PostgreSQL", "Jenkins"], teamSize: "6", projectName: "DevMetrics Dashboard", client: "", industry: "Open Source",
    },
    {
      id: "2", company: "IBM", role: "Software Engineer Intern", companyWebsite: "", location: "Research Triangle Park, NC",
      employmentType: "internship", workMode: "onsite", startDate: "2022-06", endDate: "2022-08",
      currentlyWorking: false,
      description: `<ul><li>Contributed to an internal REST API used by 5 product teams, adding 3 new endpoints and improving test coverage from 60% to 88%</li><li>Participated in Agile sprints, daily standups, and sprint retrospectives across a team of 12 engineers</li></ul>`,
      achievements: "Delivered assigned sprint tasks with zero critical bugs in production.",
      technologies: ["Java", "Spring Boot", "MySQL"], teamSize: "12", projectName: "", client: "", industry: "Enterprise Software",
    },
  ],
  oneEdu("B.S. Computer Science", "NC State University", "Raleigh, NC", "3.7"),
  oneProject("StudyBuddy", "React, Node.js, MongoDB, Socket.io"),
);

// 19. consultant-pro — Management Consultant
const consultantProProfile = make(
  "Stephanie Hughes", "Senior Consultant", "s.hughes@email.com", "+1 617 555 0254", "Boston, MA",
  "Senior management consultant with 7+ years delivering high-impact digital transformation and operational efficiency programs at Deloitte and PwC. Six Sigma Black Belt. Led engagements ranging from $5M to $45M across healthcare, logistics, and financial services. Known for translating complex operational data into clear executive strategies and actionable roadmaps.",
  { programming: ["SQL", "Python", "R", "VBA"], frameworks: [], databases: ["SQL Server", "Snowflake"], cloud: [], devops: [], tools: ["PowerPoint", "Excel", "Tableau", "Power BI", "Miro", "ServiceNow", "Salesforce"], softSkills: ["Stakeholder Management", "Executive Communication", "Workshop Facilitation", "Change Management", "Data Analysis"], languages: ["English", "Mandarin"] },
  twoJobs("Senior Consultant", "Deloitte", "Consultant", "PwC"),
  oneEdu("M.B.A.", "MIT Sloan School of Management", "Cambridge, MA", "3.85"),
  oneProject("OpsOptimizer", "Python, Tableau, SQL, Power BI"),
);

// 20. founder-resume — Startup Founder
const founderResumeProfile = make(
  "Christopher Lane", "Founder & CEO", "chris.lane@email.com", "+1 415 555 0399", "San Francisco, CA",
  "Serial entrepreneur with 2 successful exits totaling $85M. Most recently built BuildFast (YC S19) to $12M ARR with a 22-person team before acquisition by Atlassian in 2023. Deep technical background in developer infrastructure. Passionate about finding 10× problems in tooling, shipping fast, and building high-trust teams. Angel investor in 8 early-stage startups.",
  { programming: ["TypeScript", "Go", "Python", "SQL"], frameworks: ["Next.js", "FastAPI", "gRPC"], databases: ["PostgreSQL", "Redis", "ClickHouse"], cloud: ["AWS", "Vercel", "Fly.io"], devops: ["Kubernetes", "Terraform", "GitHub Actions"], tools: ["Linear", "Notion", "Stripe", "PostHog", "Intercom"], softSkills: ["Fundraising", "Recruiting", "Board Communication", "Technical Vision", "Go-to-Market"], languages: [] },
  twoJobs("Founder & CEO", "BuildFast (YC S19, Acq. Atlassian)", "Co-founder & CTO", "DevPipe"),
  oneEdu("B.S. Computer Science", "Stanford University", "Stanford, CA", "3.6"),
  oneProject("OpenDeploy", "Go, Kubernetes, TypeScript, Terraform"),
);

// ─── Default export ───────────────────────────────────────────────────────────

/** Used as fallback in places that reference SAMPLE_RESUME directly */
export const SAMPLE_RESUME: ResumeBuilderData = modernProfile;

/** Per-template profiles for the gallery */
export const SAMPLE_PROFILES: Record<string, ResumeBuilderData> = {
  modern:              modernProfile,
  classic:             classicProfile,
  executive:           executiveProfile,
  innovator:           innovatorProfile,
  minimalist:          minimalistProfile,
  "ats-minimal":       atsMinimalProfile,
  "ats-compact":       atsCompactProfile,
  "startup-bold":      startupBoldProfile,
  "creative-sidebar":  creativeSidebarProfile,
  "professional-clean": professionalCleanProfile,
  "tech-focused":      techFocusedProfile,
  "designer-split":    designerSplitProfile,
  "ats-elegant":       atsElegantProfile,
  "gradient-pro":      gradientProProfile,
  "executive-luxe":    executiveLuxeProfile,
  "creative-portfolio": creativePortfolioProfile,
  "developer-dark":    developerDarkProfile,
  "fresher-edge":      fresherEdgeProfile,
  "consultant-pro":    consultantProProfile,
  "founder-resume":    founderResumeProfile,
};

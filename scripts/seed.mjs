// One-time migration script: pushes the portfolio's original hardcoded
// content (and its images from /public) into Supabase.
//
// Run once, after .env.local is set up and supabase/schema.sql has been
// executed: `node scripts/seed.mjs`
//
// Do NOT re-run this after making edits through the dashboard — it clears
// each table before inserting, so it would wipe live edits.

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  process.loadEnvFile(path.join(__dirname, "..", ".env.local"));
} catch {
  console.error(
    "Could not load .env.local — create it first (see .env.example)."
  );
  process.exit(1);
}

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);
const BUCKET = "portfolio-images";
const publicDir = path.join(__dirname, "..", "public");

async function uploadImage(fileName, folder) {
  const filePath = path.join(publicDir, fileName);
  const fileBuffer = readFileSync(filePath);
  const ext = path.extname(fileName);
  const storagePath = `${folder}/${crypto.randomUUID()}${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, {
      contentType: ext === ".png" ? "image/png" : "image/jpeg",
    });

  if (error) throw new Error(`Upload failed for ${fileName}: ${error.message}`);

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

const BIO =
  "**Hi, I'm Aditya**, an Application Support Engineer focused on keeping applications stable and reliable every day. My work covers handling incident and service request tickets, tracing production bugs, analyzing root causes, and fixing data directly in the database to keep systems running smoothly. On top of that, I can also develop web applications across both frontend and backend, giving me a deep understanding of a system, not just how to maintain it, but all the way down to its code, from **React** to **Node.js**.";

const SKILLS = [
  { category: "Frontend", stack: ["React", "Next.js", "HTML", "Tailwind CSS"] },
  { category: "Backend", stack: ["Node.js", "PostgreSQL", "Prosedur SQL", "MongoDB"] },
  { category: "Tools", stack: ["Git", "Figma", "DBeaver", "Xampp"] },
];

const PROJECTS = [
  {
    title: "School Library",
    file: "perpus.png",
    description:
      "This application is designed to assist with efficient data management and book lending processes within a school environment. On the left navigation panel, there are menu buttons with intuitive icons such as Dashboard, Book Data, Teacher Data, Student Data, Supplier Data, Lending, and Report Printing. At the bottom of the panel, there is an Admin account label along with a clearly visible red Logout button.\n\nCreated a desktop application using Java NetBeans integrated with a SQL database, designed to manage various data operations efficiently. The application includes essential features such as user login, data entry, update and deletion, as well as report generation using iReport.",
    highlights: [],
    note: null,
    stack: ["Java", "NetBeans", "SQL", "iReport"],
    link_label: "github.com/AditWrdan/School-Library",
    href: "https://github.com/AditWrdan/School-Library",
  },
  {
    title: "Broody Adventure",
    file: "broody.png",
    description:
      "Broody Adventure is a management information system application for outdoor equipment rentals located in Sentul City. The user interface design combines nature-themed visual elements with a simple and functional layout. On the left side, there is a gray navigation panel featuring menu buttons such as Dashboard, Item Data, Employee Data, Customer Data, Supplier Data, Rentals, and Report Printing.\n\nCreated a desktop application using Java NetBeans integrated with a SQL database, designed to manage various data operations efficiently. The application includes essential features such as user login, data entry, update and deletion, as well as report generation using iReport.",
    highlights: [],
    note: null,
    stack: ["Java", "NetBeans", "SQL", "iReport"],
    link_label: "github.com/AditWrdan/Broody-Adventure",
    href: "https://github.com/AditWrdan/Broody-Adventure",
  },
  {
    title: "SPK for Prospective Employees",
    file: "spk1.png",
    description:
      "The decision support process for employee selection at PT. Inovasi Tangguh Perkasa is presented through a user-friendly interface. On the left side, a vertical navigation panel is equipped with clear icons and labels to access various features such as the dashboard, employee candidate data, assessment team data, admin registration, criteria evaluation, final calculation, and decision letter generation. The main screen displays concise information in the form of informative cards showing the number of candidates, assessors, and nominations. The design adopts a professional blue color scheme with modern and clean visual elements, emphasizing that the system utilizes the Analytical Hierarchy Process (AHP) method as the foundation for decision-making.\n\nCreated a desktop application using Java NetBeans integrated with a SQL database, designed to manage various data operations efficiently. The application includes essential features such as user login, data entry, update and deletion, as well as report generation using iReport.",
    highlights: [],
    note: null,
    stack: ["Java", "NetBeans", "SQL", "AHP", "iReport"],
    link_label: "github.com/AditWrdan/SPK-Calon-Karyawan",
    href: "https://github.com/AditWrdan/SPK-Calon-Karyawan",
  },
  {
    title: "Competition Battle Campus",
    file: "combac.png",
    description:
      "A website designed to facilitate the competition registration process, equipped with registration and login features for participants. Additionally, it includes an admin panel that enables comprehensive data management, including adding, editing, and deleting participant data and competition information.\n\nCreated a website using HTML and PHP which is connected using a SQL database with several features such as login features, registration features, and raw features.",
    highlights: [],
    note: null,
    stack: ["HTML", "PHP", "SQL"],
    link_label: "github.com/AditWrdan/COMBAC",
    href: "https://github.com/AditWrdan/COMBAC",
  },
  {
    title: "Looma Aksi",
    file: "aksi.png",
    description:
      "The service information and promotional features on the website are presented through a clean and user-friendly interface. A structured navigation layout allows visitors to easily explore essential sections such as service introductions, pricing details, contact information, customer benefits, and promotional highlights. Each section is designed with clear labeling and intuitive flow, ensuring that users can quickly understand the available services and get in touch without hassle. The website provides an organized and visually appealing experience to support effective communication and service promotion.\n\nDeveloped an informational and promotional website using React.js and Tailwind CSS, featuring a responsive, fast, and user-friendly interface. The website is designed to clearly present service details, contact information, pricing, and promotional highlights through clean navigation and well-structured content sections. Its optimized layout ensures a smooth and engaging browsing experience across various devices.",
    highlights: [],
    note: null,
    stack: ["React", "Tailwind CSS"],
    link_label: "loomaaksi.netlify.app",
    href: "https://loomaaksi.netlify.app/",
  },
  {
    title: "Jasa Suruh Depok",
    file: "jasasuruh.png",
    description:
      "A website designed to provide information and promote household helper services in the Depok area. It allows users to easily explore the available services, contact information, and the benefits offered. With a simple and informative layout, the website helps users quickly find the services they need.\n\nDeveloped a modern website using React.js and Tailwind CSS, featuring a responsive, fast, and user-friendly interface. The website is designed to present information interactively, with clean navigation, well-structured content management, and an optimized layout for various devices.",
    highlights: [],
    note: null,
    stack: ["React", "Tailwind CSS"],
    link_label: "jasasuruhdepok.netlify.app",
    href: "https://jasasuruhdepok.netlify.app/",
  },
  {
    title: "FlowSend — WhatsApp Campaign Manager",
    file: "flowsend.png",
    description:
      "A Chrome extension for managing WhatsApp broadcast campaigns responsibly and safely, built as a complete full-stack app with its own dashboard, backend API, and database.",
    highlights: [
      "Contact management with opt-in/opt-out tracking, bulk CSV/Excel import, automatic duplicate-number detection",
      "Message templates with personalization placeholders",
      "Campaign scheduling with randomized send delays and batch rest periods, so sending patterns feel natural",
      "Multi-agent system with Admin/Super Admin roles — every agent's data is fully isolated and enforced server-side",
      "\"View as Agent\" impersonation for Super Admins, for support/troubleshooting",
      "Real-time server & database health monitoring dashboard, with chart visualizations",
      "Security auto-logout synced to WhatsApp Web session state, brute-force rate limiting, full audit trail (who changed what, and when)",
    ],
    note: "This project was vibe coded — I drove the product requirements, feature decisions, and user flows, while the technical implementation was executed through iterative collaboration with AI (Claude).",
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB Atlas"],
    link_label: null,
    href: null,
  },
];

const EXPERIENCE = [
  {
    logo: "ILC",
    file: "ILCS.jpg",
    period: "Dec 2025 — Present",
    role: "Infra & Application Support",
    company: "Integrasi Logistik Cipta Solusi · Jakarta, Indonesia · On-site",
    description:
      "Provided application support for mission-critical port and logistics systems within Pelindo Group.",
    highlights: [
      "Monitored application performance and system availability to ensure stable daily operations.",
      "Investigated, analyzed, and resolved application and database issues with minimal operational impact.",
      "Handled incident, problem, and service requests in accordance with SLA and operational priorities.",
      "Performed data validation, analysis, and troubleshooting using Oracle SQL and PL/SQL.",
      "Supported operational processes including billing, payment, gate-in/gate-out, and container movement.",
      "Documented incidents, solutions, and operational procedures to improve system reliability.",
    ],
    tag: "Contract",
  },
  {
    logo: "YSH",
    file: "hsn.jpg",
    period: "Oct 2023 — Jan 2024",
    role: "Intern",
    company: "Yayasan Sultan Hasanudin",
    description:
      "Internship at Sultan Hasanudin Foundation, developing a library book lending application using Java (NetBeans) and MySQL. The application includes features for book management, member registration, borrowing and returning transactions, as well as generating reports. Responsible for database design, user interface development, program logic implementation, and system testing.",
    highlights: [],
    tag: "Internship",
  },
];

const EDUCATION = [
  {
    logo: "UP",
    file: "unindra.jpg",
    period: "2021 — 2025",
    school: "Universitas Indraprasta PGRI (UNINDRA)",
    field: "Computer Science",
  },
  {
    logo: "SMK",
    file: "pnb.png",
    period: "Vocational",
    school: "SMK Penerbangan Angkasa Bogor",
    field: "Vocational School",
  },
];

async function main() {
  console.log("Uploading images...");
  const profileUrl = await uploadImage("profile.jpg", "about");

  const projectRows = [];
  for (const [i, p] of PROJECTS.entries()) {
    const image_url = await uploadImage(p.file, "projects");
    projectRows.push({
      title: p.title,
      image_url,
      description: p.description,
      highlights: p.highlights,
      note: p.note,
      stack: p.stack,
      link_label: p.link_label,
      href: p.href,
      sort_order: i,
    });
  }

  const experienceRows = [];
  for (const [i, e] of EXPERIENCE.entries()) {
    const logo_image_url = await uploadImage(e.file, "experience");
    experienceRows.push({
      logo: e.logo,
      logo_image_url,
      period: e.period,
      role: e.role,
      company: e.company,
      description: e.description,
      highlights: e.highlights,
      tag: e.tag,
      sort_order: i,
    });
  }

  const educationRows = [];
  for (const [i, ed] of EDUCATION.entries()) {
    const logo_image_url = await uploadImage(ed.file, "education");
    educationRows.push({
      logo: ed.logo,
      logo_image_url,
      period: ed.period,
      school: ed.school,
      field: ed.field,
      sort_order: i,
    });
  }

  console.log("Clearing existing rows...");
  await supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("skill_categories").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("experience").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("education").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("Inserting data...");
  await supabase.from("about").upsert({
    id: 1,
    bio: BIO,
    photo_url: profileUrl,
    updated_at: new Date().toISOString(),
  });

  await supabase
    .from("skill_categories")
    .insert(SKILLS.map((s, i) => ({ ...s, sort_order: i })));

  await supabase.from("projects").insert(projectRows);
  await supabase.from("experience").insert(experienceRows);
  await supabase.from("education").insert(educationRows);

  console.log("Seed complete.");
  console.log(
    `Rows: ${projectRows.length} projects, ${SKILLS.length} skill categories, ${experienceRows.length} experience, ${educationRows.length} education, 1 about.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

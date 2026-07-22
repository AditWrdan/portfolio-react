export type About = {
  id: number;
  bio: string;
  photo_url: string | null;
  updated_at: string;
};

export type SkillCategory = {
  id: string;
  category: string;
  stack: string[];
  sort_order: number;
};

export type Project = {
  id: string;
  title: string;
  image_url: string | null;
  description: string;
  highlights: string[] | null;
  note: string | null;
  stack: string[];
  link_label: string | null;
  href: string | null;
  sort_order: number;
};

export type ExperienceEntry = {
  id: string;
  logo: string;
  logo_image_url: string | null;
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[] | null;
  tag: string;
  sort_order: number;
};

export type EducationEntry = {
  id: string;
  logo: string;
  logo_image_url: string | null;
  period: string;
  school: string;
  field: string;
  sort_order: number;
};

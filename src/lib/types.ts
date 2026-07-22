export type Project = {
  title: string;
  image: string | null;
  description: string;
  highlights: string[];
  note: string | null;
  stack: string[];
  linkLabel: string | null;
  href: string | null;
};

export type SkillCategory = {
  category: string;
  stack: string[];
};

export type ExperienceEntry = {
  logo: string;
  logoImage: string | null;
  period: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  tag: string;
};

export type EducationEntry = {
  logo: string;
  logoImage: string | null;
  period: string;
  school: string;
  field: string;
};

export type About = {
  bio: string;
  photoUrl: string | null;
};

import { Navigate, Route, Routes } from "react-router-dom";
import PasswordGate from "../dashboard/PasswordGate";
import DashboardLayout from "../dashboard/DashboardLayout";
import ProjectsAdmin from "../dashboard/ProjectsAdmin";
import SkillsAdmin from "../dashboard/SkillsAdmin";
import AboutAdmin from "../dashboard/AboutAdmin";
import EducationAdmin from "../dashboard/EducationAdmin";
import ExperienceAdmin from "../dashboard/ExperienceAdmin";

export default function DashboardPage() {
  return (
    <PasswordGate>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="skills" element={<SkillsAdmin />} />
          <Route path="about" element={<AboutAdmin />} />
          <Route path="education" element={<EducationAdmin />} />
          <Route path="experience" element={<ExperienceAdmin />} />
        </Route>
      </Routes>
    </PasswordGate>
  );
}

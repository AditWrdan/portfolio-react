import { clearDashboardPassword, getDashboardPassword } from "./dashboardAuth";

export async function saveContent(resource: string, data: unknown) {
  const res = await fetch("/.netlify/functions/save-content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resource, data, password: getDashboardPassword() }),
  });

  if (res.status === 401) {
    clearDashboardPassword();
    window.location.reload();
    throw new Error("Password salah — silakan masukkan ulang.");
  }
  if (!res.ok) {
    throw new Error(await res.text());
  }
}

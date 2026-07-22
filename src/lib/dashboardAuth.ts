const KEY = "dashboard_password";

export function getDashboardPassword(): string {
  return sessionStorage.getItem(KEY) ?? "";
}

export function setDashboardPassword(password: string) {
  sessionStorage.setItem(KEY, password);
}

export function clearDashboardPassword() {
  sessionStorage.removeItem(KEY);
}

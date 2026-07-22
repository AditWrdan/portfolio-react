const ALLOWED_RESOURCES = new Set([
  "projects",
  "skills",
  "experience",
  "education",
  "about",
]);

const GITHUB_API = "https://api.github.com";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: "Invalid JSON body" };
  }

  const { resource, data, password } = payload;

  if (password !== process.env.DASHBOARD_PASSWORD) {
    return { statusCode: 401, body: "Unauthorized" };
  }
  if (!ALLOWED_RESOURCES.has(resource)) {
    return { statusCode: 400, body: "Unknown resource" };
  }

  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_BRANCH || "main";
  const path = `src/data/${resource}.json`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  try {
    // Look up the current file's sha (required by GitHub to update a file).
    const getRes = await fetch(
      `${GITHUB_API}/repos/${repo}/contents/${path}?ref=${branch}`,
      { headers }
    );
    const sha = getRes.ok ? (await getRes.json()).sha : undefined;

    const content = Buffer.from(
      JSON.stringify(data, null, 2) + "\n",
      "utf-8"
    ).toString("base64");

    const putRes = await fetch(`${GITHUB_API}/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: `dashboard: update ${resource}`,
        content,
        sha,
        branch,
      }),
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      return { statusCode: 502, body: `GitHub error: ${errText}` };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
};

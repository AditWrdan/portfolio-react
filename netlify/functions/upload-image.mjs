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

  const { fileName, dataUrl, password } = payload;

  if (password !== process.env.DASHBOARD_PASSWORD) {
    return { statusCode: 401, body: "Unauthorized" };
  }

  const match = /^data:(.+);base64,(.+)$/.exec(dataUrl ?? "");
  if (!match) {
    return { statusCode: 400, body: "Invalid data URL" };
  }
  const base64Content = match[2];

  const safeName = String(fileName ?? "image").replace(/[^a-zA-Z0-9.-]/g, "_");
  const finalName = `${Date.now()}-${safeName}`;
  const path = `public/uploads/${finalName}`;

  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_BRANCH || "main";

  try {
    const putRes = await fetch(`${GITHUB_API}/repos/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `dashboard: upload ${finalName}`,
        content: base64Content,
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
      body: JSON.stringify({ url: `/uploads/${finalName}` }),
    };
  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
};

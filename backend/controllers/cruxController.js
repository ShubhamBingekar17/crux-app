
async function getCruxData(req, res) {
  const urls = req.body.urls || [];
  const device = req.body.device || "PHONE";

  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'Provide "urls": ["https://"]' });
  }

  const results = [];
  for (const u of urls) {
    try {
      const r = await queryCrux(u, device);
      results.push({ url: u, ...r });
    } catch (err) {
      results.push({ url: u, success: false, error: err.toString() });
    }
  }

  res.json({ results });
}

async function queryCrux(url, device = "DESKTOP", metrics = null) {
  const body = { url, formFactor: device };
  if (metrics) body.metrics = metrics;

  const res = await fetch(CRUX_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (!res.ok) {
      return { success: false, status: res.status, error: data };
    }
    return { success: true, data };
  } catch (e) {
    return { success: false, status: res.status, error: text };
  }
}


module.exports = { getCruxData };

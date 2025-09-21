const { queryCrux } = require("../services/cruxService");

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

module.exports = { getCruxData };

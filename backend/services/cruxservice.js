const fetch = require("node-fetch");
require("dotenv").config();

const API_KEY = process.env.CRUX_API_KEY;
const CRUX_ENDPOINT = `https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${API_KEY}`;

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

module.exports = { queryCrux };

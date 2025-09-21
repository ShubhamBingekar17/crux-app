import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import Analytics from "./Analytics";

function CustomTabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function TabView({ displayed }) {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (displayed.length === 0) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Analytics Tabs"
        variant="scrollable"
        scrollButtons="auto"
      >
        {displayed.map((r, idx) => (
          <Tab
            key={idx}
            label={r.url ? r.url.split("//")[1] : `Site ${idx + 1}`}
          />
        ))}
      </Tabs>

      {displayed.map((r, idx) => (
        <CustomTabPanel key={idx} value={tabValue} index={idx}>
          {r.data ? <Analytics record={r.data.record} /> : "No data available"}
        </CustomTabPanel>
      ))}
    </Box>
  );
}

import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import HistogramChart from "../components/HistogramChart";
import PieBreakdown from "../components/PieBreakdown";
import PercentileChart from "../components/PercentileChart";

export default function Analytics({ record }) {
  const metrics = record.metrics;

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3}>
        {/* Histograms */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              First Contentful Paint (FCP)
            </Typography>
            <HistogramChart data={metrics.first_contentful_paint} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Largest Contentful Paint (LCP)
            </Typography>
            <HistogramChart data={metrics.largest_contentful_paint} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Interaction to Next Paint (INP)
            </Typography>
            <PercentileChart data={metrics.interaction_to_next_paint} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Cumulative Layout Shift (CLS)
            </Typography>
            <PercentileChart data={metrics.cumulative_layout_shift} />
          </Paper>
        </Grid>

        {/* Pie Charts */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Navigation Types
            </Typography>
            <PieBreakdown fractions={metrics.navigation_types.fractions} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              LCP Resource Types
            </Typography>
            <PieBreakdown
              fractions={metrics.largest_contentful_paint_resource_type.fractions}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

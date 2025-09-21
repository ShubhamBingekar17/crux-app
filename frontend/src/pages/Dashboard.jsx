import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel
} from "@mui/material";
import TabView from "../layouts/TabView";
import { getDeviceType } from "../utils/utils";
import { getCruxData } from "../utils/api";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [searchUrl, setSearchUrl] = useState("");
  const [orderBy, setOrderBy] = useState({ field: "lcp", direction: "asc" });

  const handleSearch = async () => {
    const urls = input
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const deviceType = getDeviceType()
    const response = await getCruxData(urls, deviceType)
    setResults(response)
  };

  const handleSort = (field) => {
    const dir =
      orderBy.field === field && orderBy.direction === "asc" ? "desc" : "asc";
    setOrderBy({ field, direction: dir });
  };

  // Filter and sort by URL search
  const displayed = [...results]
    .filter((r) => {
      if (!r || !r.success) return true;
      if (!searchUrl) return true;
      return r.url.toLowerCase().includes(searchUrl.toLowerCase());
    })
    .sort((a, b) => {
      const dir = orderBy.direction === "asc" ? 1 : -1;

      const getVal = (r) => {
        if (orderBy.field === "lcp") {
          return (
            r?.data?.record?.metrics?.largest_contentful_paint?.percentiles
              ?.p75 || 0
          );
        }
        if (orderBy.field === "fcp") {
          return (
            r?.data?.record?.metrics?.first_contentful_paint?.percentiles
              ?.p75 || 0
          );
        }
        return 0;
      };

      return (getVal(a) > getVal(b) ? 1 : -1) * dir;
    });

  return (
    <Container maxWidth="100%" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        CrUX BrightEdge: Website Performance Lookup Assignment
      </Typography>

      {/* Search input */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body1" gutterBottom>
          Enter one or more URLs (one per line).
        </Typography>
        <TextField
          multiline
          rows={3}
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Box sx={{ display: "flex", mt: 2 }}>
          <Button variant="contained" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>

      {/* Results table */}
      <Paper sx={{ p: 2 }}>
        <TextField
          label="Search by URL"
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.target.value)}
          sx={{ mb: 2 }}
          fullWidth
        />
        <Typography variant="h6">Results</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy.field === "lcp"}
                  direction={orderBy.direction}
                  onClick={() => handleSort("lcp")}
                >
                  LCP p75 (ms)
                </TableSortLabel>
              </TableCell>
              <TableCell>CLS p75</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy.field === "fcp"}
                  direction={orderBy.direction}
                  onClick={() => handleSort("fcp")}
                >
                  FCP p75 (ms)
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayed.map((r, idx) => (
              <TableRow key={idx}>
                <TableCell>{r.url || "-"}</TableCell>
                <TableCell>{r.success ? "Success" : "Failed"}</TableCell>
                <TableCell>
                  {r.data?.record?.metrics?.largest_contentful_paint
                    ?.percentiles?.p75
                    ? Math.round(
                        r.data.record.metrics.largest_contentful_paint
                          .percentiles.p75
                      )
                    : "-"}
                </TableCell>
                <TableCell>
                  {r.data?.record?.metrics?.cumulative_layout_shift?.percentiles
                    ?.p75
                    ? Number(
                        r.data.record.metrics.cumulative_layout_shift
                          .percentiles.p75
                      ).toFixed(3)
                    : "-"}
                </TableCell>
                <TableCell>
                  {r.data?.record?.metrics?.first_contentful_paint?.percentiles
                    ?.p75
                    ? Math.round(
                        r.data.record.metrics.first_contentful_paint.percentiles
                          .p75
                      )
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {displayed.length > 0 && <TabView displayed={displayed} />}
      </Paper>
    </Container>
  );
}

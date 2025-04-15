"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Box, Typography, Paper, Chip } from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

function SearchStatus() {
  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const name = searchParams.get("name");
  const zip = searchParams.get("zipCode");
  const careType = searchParams.get("careType");

  const isSuccessful =
    message?.includes("matched") || message?.includes("forwarded");

  return (
    <Box className="p-6 max-w-4xl mx-auto">
      <Typography variant="h5" fontWeight={600} className="mb-4 text-center">
        Your Facility Details
      </Typography>

      <Box className="mb-6 text-center">
        <Typography variant="body1" className="text-lg font-medium">
          {message}
        </Typography>
      </Box>

      {isSuccessful ? (
        <Paper
          elevation={4}
          className="p-6 bg-gradient-to-r from-green-100 to-green-50 rounded-2xl shadow-xl"
        >
          <Box className="mb-4 flex items-center gap-2">
            <CheckCircleOutline color="success" fontSize="large" />
            <Typography variant="h6" fontWeight={600}>
              Match Found!
            </Typography>
          </Box>

          <Box className="mb-4">
            <Typography variant="body1" fontWeight={500}>
              <strong>Facility Name:</strong> {name}
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              <strong>Care Type:</strong> {careType}
            </Typography>
            {careType !== "Day Care" && zip && (
              <Typography variant="body1" fontWeight={500}>
                <strong>Facility Zip Code:</strong> {zip}
              </Typography>
            )}
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={4}
          className="p-6 bg-gradient-to-r from-red-100 to-red-50 rounded-2xl shadow-xl"
        >
          <Box className="mb-4 flex items-center gap-2">
            <ErrorOutline color="error" fontSize="large" />
            <Typography variant="h6" fontWeight={600}>
              No match found
            </Typography>
          </Box>
          <Typography variant="body1" className="text-center">
            No facilities match your query.
          </Typography>
        </Paper>
      )}

      <Box className="mt-6 text-center">
        <Chip
          label="Go Back to Home"
          clickable
          color="secondary"
          component="a"
          href="/"
          className="cursor-pointer"
        />
      </Box>
    </Box>
  );
}

export default function StatusPage() {
  return (
    <Suspense>
      <SearchStatus />
    </Suspense>
  );
}

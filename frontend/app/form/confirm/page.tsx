"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function Confirmation() {
  const { data } = useFormContext();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${backendUrl}submitForm`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok && result.facility) {
      const params = new URLSearchParams({
        message: result.message,
        name: result.facility.name,
        zipCode: result.facility.zipCode.toString(),
        careType: result.facility.careType,
      });
      router.push(`/status?${params.toString()}`);
    } else {
      const params = new URLSearchParams({ message: result.message });
      router.push(`/status?${params.toString()}`);
    }
  };

  const handleBack = () => {
    data.name = "";
    data.careType = "Stationary";
    data.zipCode = "";
    router.push("/form/step1");
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Paper elevation={3} className="w-full max-w-md p-6 rounded-2xl">
        <Box className="mb-6">
          <Typography variant="h6" fontWeight={600}>
            Review Your Details
          </Typography>
        </Box>

        <Box className="space-y-4 my-4">
          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight={500}>
              <strong>Patient Name:</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.name}
            </Typography>
          </Box>

          <Box className="flex justify-between">
            <Typography variant="body1" fontWeight={500}>
              <strong>Care Type:</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {data.careType}
            </Typography>
          </Box>

          {data.careType !== "Day Care" && data.zipCode && (
            <Box className="flex justify-between">
              <Typography variant="body1" fontWeight={500}>
                <strong>Zip Code:</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {data.zipCode}
              </Typography>
            </Box>
          )}
        </Box>

        <Box className="flex justify-between gap-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
            className="w-full rounded-xl"
          >
            Reset
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className="w-full rounded-xl"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { Place } from "@mui/icons-material";

const zipCodeSchema = z.string().length(5, "Zip Code must be 5 digits");

export default function StepThree() {
  const { setFormValues, data } = useFormContext();
  const [zipCode, setZipCode] = useState(data.zipCode || "");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    const validation = zipCodeSchema.safeParse(zipCode);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setFormValues({ zipCode });
    router.push("/form/confirm");
  };

  const handlePrev = () => {
    router.push("/form/step2");
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Paper elevation={3} className="w-full max-w-md p-6 rounded-2xl">
        <Box className="flex items-center gap-2 mb-6">
          <Place color="primary" />
          <Typography variant="h5" component="h2" fontWeight={600}>
            Step 3: Patient Zip Code
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Enter patient's zip code"
          variant="outlined"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          error={!!error}
          helperText={error}
          margin="normal"
        />

        <Box className="flex justify-between gap-4">
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlePrev}
            className="w-full rounded-xl"
          >
            Back
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className="w-full rounded-xl"
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

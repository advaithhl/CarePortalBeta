"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { Person } from "@mui/icons-material";

const nameSchema = z.string().min(3, "Name must be at least 3 characters long");

export default function StepOne() {
  const { setFormValues, data } = useFormContext();
  const [patientName, setPatientName] = useState(data.name || "");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    const validation = nameSchema.safeParse(patientName);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setFormValues({ name: patientName });
    router.push("/form/step2");
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Paper elevation={3} className="w-full max-w-md p-6 rounded-2xl">
        <Box className="flex items-center gap-2 mb-6">
          <Person color="primary" />
          <Typography variant="h5" component="h2" fontWeight={600}>
            Step 1: Patient Name
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Enter patient's full name"
          variant="outlined"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          error={!!error}
          helperText={error}
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleNext}
          className="mt-4 rounded-xl"
        >
          Next
        </Button>
      </Paper>
    </Box>
  );
}

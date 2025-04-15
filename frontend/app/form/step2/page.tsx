"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { HealthAndSafety } from "@mui/icons-material";

const careTypeSchema = z.enum(["Stationary", "Ambulatory", "Day Care"]);

export default function StepTwo() {
  const { setFormValues, data } = useFormContext();
  const [careType, setCareType] = useState(data.careType || "Stationary");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    const validation = careTypeSchema.safeParse(careType);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setFormValues({ careType });
    if (careType === "Day Care") {
      router.push("/form/confirm");
    } else {
      router.push("/form/step3");
    }
  };

  const handlePrev = () => {
    router.push("/form/step1");
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Paper elevation={3} className="w-full max-w-md p-6 rounded-2xl">
        <Box className="flex items-center gap-2 mb-6">
          <HealthAndSafety color="primary" />
          <Typography variant="h5" component="h2" fontWeight={600}>
            Step 2: Type of Care
          </Typography>
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Type of Care</InputLabel>
          <Select
            value={careType}
            onChange={(e) =>
              setCareType(
                e.target.value as "Stationary" | "Ambulatory" | "Day Care"
              )
            }
            label="Type of Care"
          >
            <MenuItem value="Stationary">Stationary</MenuItem>
            <MenuItem value="Ambulatory">Ambulatory</MenuItem>
            <MenuItem value="Day Care">Day Care</MenuItem>
          </Select>
        </FormControl>

        {error && (
          <Typography variant="body2" color="error" className="mt-2">
            {error}
          </Typography>
        )}

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

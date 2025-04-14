"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Step 1: Patient Name</h2>
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Enter patient's name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

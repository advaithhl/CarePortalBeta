"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Step 3: Patient Zip Code</h2>
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Enter patient's zip code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
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

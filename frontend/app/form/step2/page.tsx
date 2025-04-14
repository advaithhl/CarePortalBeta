"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

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

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Step 2: Type of Care</h2>
      <select
        className="border p-2 w-full"
        value={careType}
        onChange={(e) =>
          setCareType(
            e.target.value as "Stationary" | "Ambulatory" | "Day Care"
          )
        }
      >
        <option value="Stationary">Stationary</option>
        <option value="Ambulatory">Ambulatory</option>
        <option value="Day Care">Day Care</option>
      </select>
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

"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StepTwo() {
  const { setFormValues, data } = useFormContext();
  const [careType, setCareType] = useState(data.careType || "Stationary");
  const router = useRouter();

  const handleNext = () => {
    setFormValues({ careType });
    router.push("/form/step3");
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

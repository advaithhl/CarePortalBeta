"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StepThree() {
  const { setFormValues, data } = useFormContext();
  const [zipCode, setZipCode] = useState(data.zipCode || "");
  const router = useRouter();

  const handleNext = () => {
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

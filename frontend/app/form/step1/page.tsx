"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StepOne() {
  const { setFormValues, data } = useFormContext();
  const [patientName, setPatientName] = useState(data.name || "");
  const router = useRouter();

  const handleNext = () => {
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

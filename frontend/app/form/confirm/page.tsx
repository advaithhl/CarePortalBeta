"use client";
import { useFormContext } from "@/app/context/FormContext";

export default function Confirmation() {
  const { data } = useFormContext();

  const handleSubmit = () => {
    // use fetch API to make call to backend.
  }

  return (
    <div className="p-4">
      <p className="mb-2">Are you ready to submit?</p>
      <ul className="list-disc ml-5 space-y-1 text-gray-700">
        <li>
          <strong>Patient Name:</strong> {data.name}
        </li>
        <li>
          <strong>Care Type:</strong> {data.careType}
        </li>
        <li>
          <strong>Zip Code:</strong> {data.zipCode}
        </li>
      </ul>
      <div className="mt-4">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

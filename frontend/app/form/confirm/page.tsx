"use client";
import { useFormContext } from "@/app/context/FormContext";
import { useRouter } from "next/navigation";

export default function Confirmation() {
  const { data } = useFormContext();
  const router = useRouter();

  const handleSubmit = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(
      `${backendUrl}/submitForm`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (response.ok && result.facility) {
      const params = new URLSearchParams({
        message: result.message,
        name: result.facility.name,
        zipCode: result.facility.zipCode.toString(),
        careType: result.facility.careType,
      });
      router.push(`/status?${params.toString()}`);
    } else {
      const params = new URLSearchParams({ message: result.message });
      router.push(`/status?${params.toString()}`);
    }
  };

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
        {data.careType !== "Day Care" && data.zipCode && (
          <li>
            <strong>Zip Code:</strong> {data.zipCode}
          </li>
        )}
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

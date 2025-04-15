"use client";
import { useSearchParams } from "next/navigation";

export default function StatusPage() {
  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const name = searchParams.get("name");
  const zip = searchParams.get("zipCode");
  const careType = searchParams.get("careType");

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Submission Result</h2>
      <p className="mb-4">{message}</p>

      {(message?.includes("matched") || message?.includes("forwarded")) && (
        <div className="bg-gray-100 p-4 rounded">
          <p>
            <strong>Facility Name:</strong> {name}
          </p>
          <p>
            <strong>Care Type:</strong> {careType}
          </p>
          <p>
            <strong>Facility Zip Code:</strong> {zip}
          </p>
        </div>
      )}
    </div>
  );
}

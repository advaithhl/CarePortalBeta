import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

const facilities = [
  {
    name: "A",
    careType: "Stationary",
    zipCodeStart: 10000,
    zipCodeEnd: 14999,
    zipCode: 12000,
    capacity: "Full",
  },
  {
    name: "B",
    careType: "Stationary",
    zipCodeStart: 15000,
    zipCodeEnd: 19999,
    zipCode: 17000,
    capacity: "Available",
  },
  {
    name: "C",
    careType: "Ambulatory",
    zipCodeStart: 20000,
    zipCodeEnd: 24999,
    zipCode: 22000,
    capacity: "Full",
  },
  {
    name: "D",
    careType: "Ambulatory",
    zipCodeStart: 25000,
    zipCodeEnd: 29999,
    zipCode: 27000,
    capacity: "Available",
  },
  {
    name: "E",
    careType: "Stationary & Ambulatory",
    zipCodeStart: 10000,
    zipCodeEnd: 24999,
    zipCode: 18000,
    capacity: "Available",
  },
];

app.post("/submitForm", async (c) => {
  const { careType, zipCode } = await c.req.json();

  const careTypeNormalized = careType.toLowerCase();

  if (careTypeNormalized === "day care") {
    return c.json({ message: "No matching facility (day care not supported)" });
  }

  // Step 1: Match care type and availability
  const availableFacilities = facilities
    .filter((f) => {
      const type = f.careType.toLowerCase();
      return (
        f.capacity === "Available" &&
        (type === careTypeNormalized || type.includes(careTypeNormalized))
      );
    })
    .map((f) => ({
      ...f,
      distance: Math.abs(f.zipCode - zipCode),
      servesZip: zipCode >= f.zipCodeStart && zipCode <= f.zipCodeEnd,
    }))
    .sort((a, b) => a.distance - b.distance);

  // Step 2: Among available facilities, prefer ones that serve the zip
  const matchingFacility = availableFacilities.find(
    (f) => f.servesZip && f.distance <= 3000
  );

  if (matchingFacility) {
    return c.json({ message: "Facility matched", facility: matchingFacility });
  }

  // Step 3: If no one serves the zip but some are still close, forward
  const forwardedFacility = availableFacilities.find((f) => f.distance <= 3000);

  if (forwardedFacility) {
    return c.json({
      message: "Facility matched via forwarding",
      facility: forwardedFacility,
    });
  }

  return c.json({
    message: "No matching facility found (too far or none available)",
  });
});

export const handler = handle(app);

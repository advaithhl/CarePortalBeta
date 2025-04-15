import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const app = new Hono();

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

type Facility = {
  name: string;
  careType: string;
  zipCodeStart: number;
  zipCodeEnd: number;
  zipCode: number;
  capacity: "Full" | "Available";
};

app.post("/submitForm", async (c) => {
  const { careType, zipCode } = await c.req.json();

  const careTypeNormalized = careType.toLowerCase();

  if (careTypeNormalized === "day care") {
    return c.json({ message: "No matching facility (day care not supported)" });
  }

  const result = await client.send(
    new ScanCommand({ TableName: "facilities" })
  );
  const facilities = result.Items as Facility[];

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

import { API_URL } from "@/constants/api";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { device_id: string } }
) {
  try {
    const { device_id } = params;

    const response = await fetch(
      `${API_URL}/device/${device_id}/history/?format=CSV`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    const data = await response.text();

    const folderPath = path.join(
      process.cwd(),
      "projects/app/api/device",
      device_id,
      "history",
      "historicalData"
    );

    const filePath = path.join(folderPath, `history-file-${device_id}.csv`);

    // Save the CSV data to the local file
    fs.writeFileSync(filePath, data);

    return NextResponse.json(
      {
        message: "CSV data saved successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching external data:", error);

    return NextResponse.json({
      status: 500,
      error: "Internal Server Error",
    });
  }
}

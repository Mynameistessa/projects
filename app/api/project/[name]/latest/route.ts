import { API_URL } from "@/constants/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  try {
    const { name } = params;
    const response = await fetch(`${API_URL}/project/${name}/latest/`);
    const data = await response.json();

    return NextResponse.json(
      {
        ...data,
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

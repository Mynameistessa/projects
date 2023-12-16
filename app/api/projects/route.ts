import { API_URL } from '@/constants/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
) {
   try {
     const response = await fetch(`${API_URL}/project/all/`);
     
     const data = await response.text()

     const projectNames = data.split("\n").filter(i => i !== "")
     

    return NextResponse.json(
      {
        projectNames
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching external data:', error);

    return NextResponse.json(
      {
        status: 500,
        error: 'Internal Server Error',
      }
    );
  }
}

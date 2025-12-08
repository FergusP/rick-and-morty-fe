import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Supports single ID or comma-separated IDs (e.g., "1,2,3")
  const url = `${BASE_URL}/character/${id}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://rickandmortyapi.com/api';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.toString();
  const url = `${BASE_URL}/character${query ? `?${query}` : ''}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}

import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "barri_access";
const DEFAULT_ACCESS_CODE = "210801";

export async function POST(request: NextRequest) {
  const accessCode = process.env.ACCESS_CODE ?? DEFAULT_ACCESS_CODE;

  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if ((body.code ?? "").trim() !== accessCode) {
    return NextResponse.json(
      { error: "Esa no era. Intenta otra vez." },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(ACCESS_COOKIE, accessCode, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}

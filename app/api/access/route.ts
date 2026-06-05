import { NextRequest, NextResponse } from "next/server";

const ACCESS_COOKIE = "barri_access";

export async function POST(request: NextRequest) {
  const accessCode = process.env.ACCESS_CODE ?? process.env.ADMIN_PASSWORD;

  if (!accessCode) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

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

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization"); 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_SING}/api/profile`, {
      headers: {
        Authorization: token || "",
        Accept: "application/json",
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("Proxy error:", err);
    return NextResponse.json({ message: err.message || "Proxy failed" }, { status: 500 });
  }
}
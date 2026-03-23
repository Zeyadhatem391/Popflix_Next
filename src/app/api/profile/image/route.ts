import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization"); 
    const body = await req.formData();

  
    const externalRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL_SING}/api/profile/image`, {
      method: "POST",
      headers: {
        Authorization: token || "", 
      },
      body: body,
    });

    const data = await externalRes.json();

    return NextResponse.json(data, { status: externalRes.status });
  } catch (err: any) {
    console.error("Proxy error:", err);
    return NextResponse.json({ message: err.message || "Proxy failed" }, { status: 500 });
  }
}
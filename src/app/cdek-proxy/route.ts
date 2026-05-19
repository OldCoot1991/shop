import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "application/json";
    let bodyText = "";
    
    try {
      bodyText = await req.text();
    } catch (e) {
      console.warn("Could not read request body:", e);
    }

    // Call the CDEK service endpoint server-to-server (no CORS restrictions)
    const response = await fetch("https://ozpro.ru/service.php", {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        "Accept": "application/json",
      },
      body: bodyText || undefined,
    });

    const responseText = await response.text();
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    // Return the response back to the widget with proper status and headers
    if (typeof responseData === "string") {
      return new NextResponse(responseData, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("content-type") || "text/plain",
        },
      });
    }

    return NextResponse.json(responseData, { status: response.status });
  } catch (error: any) {
    console.error("CDEK Proxy POST Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryString = searchParams.toString();
    const targetUrl = `https://ozpro.ru/service.php${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    const responseText = await response.text();
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    if (typeof responseData === "string") {
      return new NextResponse(responseData, {
        status: response.status,
        headers: {
          "Content-Type": response.headers.get("content-type") || "text/plain",
        },
      });
    }

    return NextResponse.json(responseData, { status: response.status });
  } catch (error: any) {
    console.error("CDEK Proxy GET Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

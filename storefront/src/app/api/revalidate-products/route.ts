
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET

  if (!secret) {
    console.error("REVALIDATION_SECRET is not configured")
    return NextResponse.json(
      { error: "Revalidation is not configured" },
      { status: 500 }
    )
  }

  const authorization = request.headers.get("authorization")

  if (authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Use the same shared tag as getCacheDirectives("products").
  revalidateTag("products")

  return NextResponse.json({ revalidated: true })
}

import { NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { password } = body;

    if (!ADMIN_PASSWORD) {
      console.error("ADMIN_PASSWORD environment variable is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Admin authentication is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    if (!password) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password.",
        },
        {
          status: 401,
        },
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
    });

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: "authenticated",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process login.",
      },
      {
        status: 500,
      },
    );
  }
}
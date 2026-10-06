import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Guest from "@/lib/models/Guest";
import { isAdminAuthenticated } from "@/lib/admin-auth";

async function generateAccessCode() {
  let accessCode = "";

  do {
    const randomPart = randomBytes(4)
      .toString("hex")
      .toUpperCase()
      .slice(0, 5);

    accessCode = `TC${randomPart}`;
  } while (await Guest.exists({ accessCode }));

  return accessCode;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, numberAttending } = body;

    if (!name || !phone || !numberAttending) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, phone number and number attending are required.",
        },
        { status: 400 },
      );
    }

    const attending = Number(numberAttending);

    if (!Number.isInteger(attending) || attending < 1 || attending > 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Number attending must be between 1 and 10.",
        },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const accessCode = await generateAccessCode();

    const guest = await Guest.create({
      name: String(name).trim(),
      phone: String(phone).trim(),
      numberAttending: attending,
      accessCode,
    });

    return NextResponse.json(
      {
        success: true,
        guest,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Guest creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save guest.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const guests = await Guest.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      guests,
    });
  } catch (error) {
    console.error("Guest retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve guests.",
      },
      { status: 500 },
    );
  }
}
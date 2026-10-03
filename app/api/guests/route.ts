import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Guest from "@/lib/models/Guest";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, numberAttending } = body;

    if (!name || !phone || !numberAttending) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, phone number and number attending are required.",
        },
        {
          status: 400,
        },
      );
    }

    await connectToDatabase();

    const guest = await Guest.create({
      name,
      phone,
      numberAttending,
    });

    return NextResponse.json(
      {
        success: true,
        guest,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Guest creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save guest.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
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
      {
        status: 500,
      },
    );
  }
}
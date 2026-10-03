import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import Gift from "@/lib/models/Gift";

const validGiftTypes = ["physical", "cash", "custom"];

const validGiftStatuses = [
  "pending",
  "received",
  "completed",
  "cancelled",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      type,
      name,
      phone,
      anonymous,
      giftTiming,
      itemId,
      itemName,
      amount,
      description,
    } = body;

    if (!type || !name || !giftTiming) {
      return NextResponse.json(
        {
          success: false,
          message: "Gift type, name and gift timing are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!validGiftTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid gift type.",
        },
        {
          status: 400,
        },
      );
    }

    await connectToDatabase();

    const gift = await Gift.create({
      type,
      name,
      phone: phone || "",
      anonymous: anonymous ?? false,
      giftTiming,
      itemId,
      itemName,
      amount,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        gift,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Gift creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save gift.",
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

    const gifts = await Gift.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      gifts,
    });
  } catch (error) {
    console.error("Gift retrieval error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve gifts.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Gift ID and status are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!validGiftStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid gift status.",
        },
        {
          status: 400,
        },
      );
    }

    await connectToDatabase();

    const gift = await Gift.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!gift) {
      return NextResponse.json(
        {
          success: false,
          message: "Gift not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      success: true,
      gift,
    });
  } catch (error) {
    console.error("Gift status update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update gift status.",
      },
      {
        status: 500,
      },
    );
  }
}
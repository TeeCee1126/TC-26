export type GiftType = "physical" | "cash" | "custom";

export type GiftTiming =
  | "Before the wedding"
  | "On the wedding day"
  | "After the wedding";

export type GiftStatus =
  | "pending"
  | "received"
  | "completed"
  | "cancelled";

export type GiftRecord = {
  type: GiftType;

  name: string;
  phone: string;
  anonymous: boolean;

  giftTiming: GiftTiming;

  itemId?: number;
  itemName?: string;

  amount?: string;

  description?: string;

  status: GiftStatus;

  createdAt: string;
};
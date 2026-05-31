import { HydratedDocument, Types } from "mongoose";
import { NotificationType } from "../models/notificationModel.js";

export interface NotificationI {
  userId: Types.ObjectId;
  type: NotificationType;

  title: string;
  message: string;

  isRead: boolean;

  relatedOrderId?: Types.ObjectId | null;
  image?: string | null;
  actionUrl?: string | null;
  actionText?: string | null;

  priority?: "low" | "normal" | "high"| "urgent";

  senderId?: Types.ObjectId | null;

  isBulkSent: boolean;
  bulkSendId?: string | null;

  targetAudience?: "all" | "specific" | "role-based";

  metadata: Record<string, unknown>;

  createdAt?: Date;
  updatedAt?: Date;
}

export type NotificationDocument = HydratedDocument<NotificationI>;
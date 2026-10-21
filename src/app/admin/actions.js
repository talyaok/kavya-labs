"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function toggleUserStatus(userId, currentStatus) {
  const session = await getAdminSession();

  if (!session) {
    return {
      success: false,
      message: "You are not authorized to perform this action.",
    };
  }

  const newStatus = currentStatus === "active" ? "inactive" : "active";

  const { data: user, error: updateError } = await supabaseAdmin
    .from("users")
    .update({ status: newStatus })
    .eq("id", userId)
    .select("id, name, status")
    .single();

  if (updateError || !user) {
    console.error("Unable to update user:", updateError?.message);

    return {
      success: false,
      message: "Unable to update the user. Please try again.",
    };
  }

  const { error: logError } = await supabaseAdmin
    .from("activity_logs")
    .insert({
      user_id: user.id,
      action: newStatus === "active" ? "user_enabled" : "user_disabled",
      details: `${user.name} was ${
        newStatus === "active" ? "enabled" : "disabled"
      } by an administrator.`,
    });

  if (logError) {
    console.error("Unable to create activity log:", logError.message);
  }

  revalidatePath("/admin");

  return {
    success: true,
    message: `${user.name} is now ${
      newStatus === "active" ? "active" : "inactive"
    }.`,
  };
}
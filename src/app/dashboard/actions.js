"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function getCurrentUserEmail() {
  const session = await auth();
  return session?.user?.email?.trim().toLowerCase() || null;
}

export async function createTask(formData) {
  const userEmail = await getCurrentUserEmail();

  if (!userEmail) return;

  const title = formData.get("title")?.toString().trim();

  if (!title || title.length > 200) return;

  const { error } = await supabaseAdmin.from("tasks").insert({
    user_email: userEmail,
    title,
    completed: false,
  });

  if (error) {
    console.error("Unable to create task:", error.message);
    return;
  }

  revalidatePath("/dashboard");
}

export async function toggleTask(formData) {
  const userEmail = await getCurrentUserEmail();

  if (!userEmail) return;

  const taskId = formData.get("taskId")?.toString();
  const currentCompleted = formData.get("completed") === "true";

  if (!taskId) return;

  const { error } = await supabaseAdmin
    .from("tasks")
    .update({ completed: !currentCompleted })
    .eq("id", taskId)
    .eq("user_email", userEmail);

  if (error) {
    console.error("Unable to update task:", error.message);
    return;
  }

  revalidatePath("/dashboard");
}

export async function deleteTask(formData) {
  const userEmail = await getCurrentUserEmail();

  if (!userEmail) return;

  const taskId = formData.get("taskId")?.toString();

  if (!taskId) return;

  const { error } = await supabaseAdmin
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_email", userEmail);

  if (error) {
    console.error("Unable to delete task:", error.message);
    return;
  }

  revalidatePath("/dashboard");
}
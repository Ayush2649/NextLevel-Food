"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMeal(formData) {
  try {
    const meal = {
      title: formData.get("title")?.trim(),
      summary: formData.get("summary")?.trim(),
      instructions: formData.get("instructions")?.trim(),
      creator: formData.get("name")?.trim(),
      creator_email: formData.get("email")?.trim(),
      image: formData.get("image"),
    };

    // 1️⃣ Required fields
    if (
      !meal.title ||
      !meal.summary ||
      !meal.instructions ||
      !meal.creator ||
      !meal.creator_email
    ) {
      throw new Error("All fields are required");
    }

    // 2️⃣ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(meal.creator_email)) {
      throw new Error("Invalid email address");
    }

    // 3️⃣ Image validation
    if (!meal.image || meal.image.size === 0) {
      throw new Error("Image is required");
    }

    // 4️⃣ Image type validation
    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedTypes.includes(meal.image.type)) {
      throw new Error("Only PNG, JPG, and WEBP images are allowed");
    }

    // 5️⃣ Image size validation (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (meal.image.size > MAX_SIZE) {
      throw new Error("Image must be smaller than 5MB");
    }

    await saveMeal(meal);
  } catch (error) {
    console.error("shareMeal validation failed:", error.message);
    throw error; // handled by Next.js error boundary
  }

  revalidatePath("/meals");
  redirect("/meals");
}

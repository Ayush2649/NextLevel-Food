import fs from "fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export default async function getAllMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error("Could not fetch meals.");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMealBySlug(mealSlug) {
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(mealSlug);
  return meal;
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true, strict: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const imageFileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${imageFileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      console.error("Saving image failed");
    }
  });

  meal.image = `/images/${imageFileName}`;

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, image, creator, creator_email, slug)
    VALUES
      (@title, @summary, @instructions, @image, @creator, @creator_email, @slug)  
  `).run(meal);
}

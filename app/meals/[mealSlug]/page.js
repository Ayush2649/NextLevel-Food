import { getMealBySlug } from "@/lib/meals";
import { notFound } from "next/navigation";
import Image from "next/image";
import classes from "./page.module.css";

export default async function MealsSlug({ params }) {
  const { mealSlug } = await params; // ✅ unwrap params

  const meal = getMealBySlug(mealSlug);

  meal.instructions = meal.instructions.replaceAll("\n", "<br/>");

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://ayush-nextjs-food-app.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>

        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        />
      </main>
    </>
  );
}

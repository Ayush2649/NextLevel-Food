import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "../../components/meals/meal-grid";
import getAllMeals from "../../lib/meals";

export default async function MealsSharePage() {
    const meals = await getAllMeals();
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself. It is easy and
          fun!!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your Favourite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={meals} /> 
      </main>
    </>
  );
}
